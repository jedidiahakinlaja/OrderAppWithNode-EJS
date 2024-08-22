const Purchase = require('../model/purchaseModel');


exports.postPurchase=(req,res)=>{
  const {name,email, address, idPurchase, price, image, title}=req.body
  const DateCurrent = new Date();
  const DateCurren = new Date();
  const DispatchTime = new Date(DateCurren.setDate(DateCurren.getDate() + 1));
  const DelivertyTime = new Date(DateCurren.setDate(DateCurren.getDate() + 1));
  const purchaseObj= new Purchase({
    name,
    email,
    address,
    idPurchase,
    price,
    image,
    title,
    DateCurrent,
    DispatchTime,
    DelivertyTime
  })
  console.log(purchaseObj);
  purchaseObj.save()
  .then(response => {
    res.redirect("/")
   })
    .catch( err => {
        res.status(500).json({ error: err })
    })

}

exports.getPurchase=(req,res)=>{
    Purchase.find()
        .then(response => {
            res.status(200).json({
                message: "result found",
                response
            })
        })
        .catch(err => {
            return res.send({ msg: "Error occured" })
        })
}
