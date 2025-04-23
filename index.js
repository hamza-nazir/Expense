const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
app.set('view engine', 'ejs');

let totalBudget = 1000000;
let totalExp = 0;
let totalProduct = 0;

let activityArr=[]
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
let productData = require('./public/js/data')
app.get('/', (req, res) => {

    res.render('home', { productData, totalBudget, totalExp, totalProduct });
});



app.post('/products', (req, res) => {
    let { name, code, category, price, quantity, supplier, description } = req.body;
    let date = new Date().toLocaleString();
    let add=`Product ${name} added with price of ${price}$`
   activityArr.push({add,date});
  
    code = parseInt(code);
    quantity = parseInt(quantity);
    price = parseInt(price);
    productData.push({ name, code, category, price, quantity, supplier, description })
   
    res.render('dashboard', { productData })





})


app.post("/dashboard/:code", (req, res) => {
    let { code } = req.params;
   
    let deleteData = productData.find((val) => {
        return val.code == code;
    })
    productData = productData.filter((val) => {
        return val.code != code;
    })

    let date = new Date().toLocaleString();
     let remove=`Product ${deleteData.name} removed with price of ${deleteData.price}$`
activityArr.push({remove,date});



    res.redirect('/dashboard')



})
app.get('/products', (req, res) => {

    res.render('products', { productData })

});

app.get('/dashboard', (req, res) => {

    res.render('dashboard', { productData })

});
app.get('/activity', (req, res) => {

    res.render('activity',{activityArr})

});






app.get('/budget', (req, res) => {
    res.render('budget', { totalBudget, totalExp, totalProduct });
});






app.post('/budget', (req, res) => {
    let { price } = req.body;
    price = parseInt(price);
    totalBudget = price;
    
    res.redirect('/')


});
app.post('/edit/:code',(req,res)=>{
    let {code}=req.params;
    let correctData = productData.find((val) => {
        return val.code == code;
    })
   
    res.render('edit',{correctData})
    
})

app.post('/edits/:code',(req,res)=>{
    let {code}=req.params;
    code=parseInt(code);
    let correctData = productData.find((val) => {
        return val.code == code;
    })
 let newCategory=req.body.category;
    let newPrice=req.body.price;
   let name=correctData.name;
    let newQuantity=req.body.quantity;
    newQuantity=parseInt(newQuantity);
    let newSupplier=req.body.supplier;
    let newDescription=req.body.description;

    newPrice=parseInt(newPrice);
  
 let savePrice=correctData.price;
   correctData.category=newCategory
   correctData.price=newPrice;
   correctData.quantity=newQuantity;
   correctData.supplier=newSupplier;
   correctData.description=newDescription;
   let date = new Date().toLocaleString();
   let edit=`Product ${name} set with new price of ${newPrice}$ having Old Price ${savePrice}$ `
   activityArr.push({edit,date});
  
   ///////////////////////////////////
    res.redirect('/dashboard')
    
    
})
app.post('/budgets', (req, res) => {


    let { price } = req.body;
    price = parseInt(price);
    totalBudget += price;
   
    res.redirect('/')

});


app.get('/products/:code', (req, res) => {
    let { code } = req.params;
    let correctData = productData.find((val) => {
        return val.code == code;
    })
    if (correctData) {
        res.render('detail', { correctData });
    }
    else {
        res.send('Wrong Code')

    }




});


app.get('/aboutus', (req, res) => {
    res.render('aboutus');
});

app.listen(port, () => {
    console.log('App listening on port');
});