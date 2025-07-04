import mercadopago from "mercadopago";

export const createOrder = async (req,res)=> {
    try {
        const result = awaitmercadopago.configure({
            access_token: process.env.MP_ACCESS_TOKEN,
        });

        mercadopago.preferences.create({
            items: [
                {
                    title: req.body.title,
                    unit_price: parseFloat(req.body.unit_price),
                    currency_id:'MXN',
                    description: req.body.description,
                    quantity: parseInt(req.body.quantity),
                },
            ],
            back_urls: {
                success: "http://localhost:8080/success",
                failure: "http://localhost:8080/failure",
                pending: "http://localhost:8080/pending"
            }
        })
        console.log("Preferencia creada:", result);
        res.status(201).json(result);
        
    } catch (error) {
        console.error("Error al crear la orden:", error);
        res.status(500).json({ error: "Error interno del servidor" });
        
    }
}