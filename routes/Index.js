const express = require("express"); 
const router = express.Router({mergeParams:true}); 
const passport = require("passport");
const nodemailer = require("nodemailer");



let User = require ("../models/User");
let LeadList = require ("../models/Leads");
const middleware = require("./../middleware/index.js");
var mongoose = require("mongoose");

router.get("/test", middleware.noCache, (req, res,next) => res.render("test",  {
  title : "test", 
  description : "test",
  canonical: "test"
}));


router.get("/", (req, res,next) => res.render("index",  {
  title : "Wytwórnia Kontentu - Treści wizualne, filmy i rendery od freelancera!", 
  description : "Szukasz kogoś do pomocy przy generowaniu interesującego kontentu do social mediów? W Wytwórni Kontentu zlecisz nagrania z drona, zdjęcia lub wizualizację 3D promujące Twoją firmę lub usługę! Specjalizuję się w branży nieruchomości ale chętnie podejmę się innych wyzwań. Sprawdź moje realizacje i zapytaj o wycenę.",
  canonical: "https://www.wytwornia-kontentu.pl"
}));

router.get("/wizualizacje", (req, res,next) => res.render("wizualizacje",  {
  title : "Realistyczne wizualizacje 3D", 
  description : "Wizualizacje 3D to idealne narzędzie do zaprezentowania klientom planowanych nieruchomościm jeszcze przed ich wybudowaniem. Zlecenie przygotowania wizualizacji 3D doświadczonemu grafikowi zdecydowanie ułatwia promowanie i komunikowanie nowej inwestycji.",
  canonical: "https://www.wytwornia-kontentu.pl/wizualizacje"
}));

router.get("/filmy-reklamowe", (req, res,next) => res.render("dron",  {
  title : "Nagrania i zdjęcia z drona", 
  description : "Musisz nagrać film promujący nową inwestycję? Masz do sprzedania działkę i chcesz ją zaprezentować w najlepszym świetle? Wypelnij formularz i poproś o wycenę.",
  canonical: "https://www.wytwornia-kontentu.pl/filmy-reklamowe"
}));

router.get("/aplikacje-webowe", (req, res,next) => res.render("aplikacje-webowe",  {
  title : "Szybkie aplikacje webowe i strony na Node.js/Mongodb", 
  description : "Potrzebujesz szybką, responsywną aplikację webową lub landing page bez rozbudowanego CMS? Dobrze trafiłeś! Strony pisane w ramach Wytwórni Kontentu są w całości napisane w HTML5 i javascript (opcjonalnie baza danych Mongodb). Wypełnij formularz i zamów wycenę.",
  canonical: "https://www.wytwornia-kontentu.pl/aplikacje-webowe"
}));

router.get("/polityka-prywatnosci", (req, res,next) => res.render("polityka-prywatnosci",  {
  title : "Polityka prywatności Wytwónia Kontentu", 
  description : "Polityka prywatności opisuje zasady przetwarzania przez nas informacji na Twój temat, w tym danych osobowych oraz ciasteczek, czyli tzw. cookies.",
  canonical: "https://www.wytwornia-kontentu.pl/polityka-prywatnosci"
}));

router.get("/scena3d", (req, res,next) => res.render("scena3d",  {
  title : "Wirtualny spacer ze zdjęciami 360", 
  description : "Wirtualny spacer po istniejącym obiekcie. W ramach usługi wykonuję sesję zdjęciową obiektu kamerą 360 i przygotowuję gotowy skrypt do wklejenia na stronę.",
  canonical: "https://www.wytwornia-kontentu.pl/scena3d"
}));

router.get("/scena3d-2", (req, res,next) => res.render("scena3d-2",  {
  title : "Wirtualny spacer ze zdjęciami 360", 
  description : "Wirtualny spacer po istniejącym obiekcie. W ramach usługi wykonuję sesję zdjęciową obiektu kamerą 360 i przygotowuję gotowy skrypt do wklejenia na stronę.",
  canonical: "https://www.wytwornia-kontentu.pl/scena3d-2"
}));

router.get("/wiadomosc-wyslana", (req, res,next) => res.render("dziekujemy",  {
  title : "Wiadomość wysłana", 
  description : "Dziękuje za zainteresowanie ofertą, skontaktuję się w celu ustalenia szczaegółów.",
  canonical: "https://www.wytwornia-kontentu.pl/wiadomosc-wyslana"
}));
router.get("/wiadomosc-nie-wyslana", (req, res,next) => res.render("error",  {
  title : "Wirtualny spacer ze zdjęciami 360", 
  description : "Wirtualny spacer po istniejącym obiekcie. W ramach usługi wykonuję sesję zdjęciową obiektu kamerą 360 i przygotowuję gotowy skrypt do wklejenia na stronę.",
  canonical: "https://www.wytwornia-kontentu.pl/scena3d"
}));


router.get("/zdjecia360", (req, res,next) => res.render("zdjecia360",  {
  title : "Wirtualny spacer po scenie 3D", 
  description : "Wirtualny spacer po scenie 3D. W ramach usługi wykonuję model wnętrza nieruchomości na podstawie planów architektonicznych, renderuję wizualizacje equirectangular i dostarczam gotowy spacer do wklejenia na stronę.",
  canonical: "https://www.wytwornia-kontentu.pl/zdjecia360"
}));

router.get("/wirtualny-spacer", (req, res,next) => res.render("spacer",  {
  title : "Wirtualne spacery ze zdjęć 360 i renderów", 
  description : "Oferuję dwa rozwiązania: spacer po wirtualnej, umeblowanej scenie oraz spacer z wykorzystaniem zdjęć 360 istniejącego lokalu. Napisz i zamów wycenę.",
  canonical: "https://www.wytwornia-kontentu.pl/wirtualny-spacer"
}));

router.get('/leads', middleware.isAdmin, middleware.noCache, (req, res, next) => {
   LeadList.find({}, function (err, allLeads) {
        res.render("leads",{
          allLeads:allLeads,
          title : "Nagrania z drona, rendery 3d i wirtualne spacery w niskich cenach!", 
          description : "Szukasz kogoś do pomocy przy generowaniu interesującego kontentu? Potrzebujesz ujęcia Twojej firmy lub wizualizacje nowej inwestycji? Napisz do nas i sprawdź co możemy zaoferować.",
          canonical: "https://www.wytwornia-kontentu.pl/leads"
        });
   });
})


/*
 router.get('/users', middleware.isAdmin, middleware.noCache, (req, res, next) => {
    User.find({}, function (err, allUsers) {
        res.render("userList",{
           allUsers:allUsers,
         title : "Nagrania z drona, rendery 3d i wirtualne spacery w niskich cenach!", 
         description : "Szukasz kogoś do pomocy przy generowaniu interesującego kontentu? Potrzebujesz ujęcia Twojej firmy lub wizualizacje nowej inwestycji? Napisz do nas i sprawdź co możemy zaoferować."
        });
    });
 })
*/

router.get("/login", middleware.noCache, (req, res,next) => res.render("login",  {
  title : "Nagrania z drona, rendery 3d i wirtualne spacery w niskich cenach!", 
  description : "Szukasz kogoś do pomocy przy generowaniu interesującego kontentu? Potrzebujesz ujęcia Twojej firmy lub wizualizacje nowej inwestycji? Napisz do nas i sprawdź co możemy zaoferować.",
  canonical: "https://www.wytwornia-kontentu.pl/login"
}));

/*
 router.get("/addadmin", middleware.noCache, (req, res, next) => {
  User.remove({}, function(err) { 
   console.log('collection removed') 
 });
 User.register({username: ".....", isAdmin:true}, ".....", function (err,user){
            if(err){
                    res.render("index");
                   } 
           if(!err){
                     res.render("index");}
           })
  });
*/

router.post("/login", middleware.noCache, passport.authenticate("local", {
                            successRedirect:"/leads",
                            failureRedirect:"/login",
                        }), function(req, res, next){
                        });


router.post("/leads", middleware.noCache, (req, res) => {
    var date = new Date();
    let leadName = req.body.name;
    let leadPhone = req.body.phone;
    let leadEmail = req.body.email;
    let leadMessage = req.body.message;
    let leadDate = date;
    let leadGoogleID = req.body.googleID;
    let leadGclID = req.body.gclID;
    if(req.body.name == null){leadName="-"}
    if(req.body.phone == null){leadPhone="-"}
    if(req.body.email == null){leadEmail="-"}
    if(req.body.message == null){leadMessage="-"}
    if(req.body.googleID == null){leadGoogleID="-"}
    if(req.body.gclID == null){leadGclID.name="-"}

 
    let ip = req.headers['x-forwarded-for'] ||  req.socket.remoteAddress ||  null;
   
 
let spamList = ['181.214.218.57','181.214.218.43','37.139.53.82','181.214.218.57','181.214.218.46','84.17.43.5','156.146.63.158','181.214.218.38','5.44.174.110','156.146.63.148','181.214.218.71'];

    if (spamList.includes(ip)){res.redirect("/wiadomosc-nie-wyslana")}

    else{

            LeadList.create({ 
                name: leadName,
                phone: leadPhone,
                email: leadEmail,
                message: leadMessage,
                date: date,
                googleID: leadGoogleID,
                gclID: leadGclID,
                leadIp: ip,
                             }, function(err) {
                                if (!err) {


										async function main() {
										
									
											let transporter = nodemailer.createTransport({
										     service: 'Gmail', // no need to set host or port etc.
										     auth: {
										         user: 'wytworniakontentu@gmail.com',
										         
                             pass: process.env.GMAIL_PASS
										     }
										});



										  let info = await transporter.sendMail({
										    from: 'wytworniakontentu@gmail.com', 
										    to: "pawel.walasiewicz@gmail.com", 
										    subject: "ZAPYTANIE OFERTOWE",
										    text: "Szczegóły zapytania",
										    html: "<b>Nazwa: "+leadName+"</b><br><b>Telefon: "+leadPhone+"</b><br><b>Email: "+leadEmail+"</b><br><b>Wiadomość: "+leadMessage+"</b>",

										  });
										}

										main().catch(console.error).then(function(){
											return res.redirect("/wiadomosc-wyslana");
										});
                                }
                                else {
                                  res.redirect("/wiadomosc-nie-wyslana")
                                }
                })
  
};


  });

 
router.post('/delete/all', middleware.isAdmin, middleware.noCache, (req, res, next) => {
  
    LeadList.remove({}, function(err) {
    if (!err) {
            return res.redirect("/leads")
    }
    else {
           res.redirect("/") 
    }
   });
   }); 

router.post('/delete/:id', middleware.isAdmin, middleware.noCache, (req, res, next) => {
  let id = req.params.id;
    LeadList.remove({ _id: id }, function(err) {
    if (!err) {
            return res.redirect("/leads")
    }
    else {
           res.redirect("/") 
    }
   });
   });

router.get("*", (req, res, next) => {
  res.send('Nie ma takiej strony :(', 404);
});

/// auth routes example
/*
router.post("/osiedle/:id/dzialka/edit", controller.updateLot)
router.get("/osiedle/:id/dzialka/:idLot", controller.renderEditLotForm)
*/
module.exports = router;
