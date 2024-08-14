
// #################################################
// cliquer sur le boutton demarrer le quize 
// $('#btn-start').click(function(){
//     $('#quiz-box').slideDown(1000);
//     $('#intro-quiz').slideUp(2000);  
// });
// fin bouton demarrage
// $(document).ready(function(){
//     $('#btn-start').click(function(){
//         $('#batman-game').addClass('hidden');
//         $('#quiz-box').removeClass('hidden');
//     });
// });
// fin bouton demarrarer

// Effet scroll
$('#stop-arrow').click(function(){
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
$('#down-arrow').click(function(){
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
});
// fin effet scroll
// ########################################################


// #############################################################################
// ######## Animation des slides de la page game ###############################
$(document).ready(function(){
    //Masquer les diapositives de questions au départ
    $('.question-slide').hide();

    // Récupère le nombre total de questions
    var totalQuestions = $('.question-slide').length;
    
     // Ajoute les numéros de question à chaque diapositive
    $('.question-slide').each(function(index){
        var questionNumber = index + 1;
        $(this).find('.question-number').text(questionNumber + '/' + totalQuestions);
     });
    
     // Clic sur le bouton "Démarrer"
     $('.start-button').click(function(){
         // Hide the chevalier section
         $('.intro-quiz').slideUp(2000);  
        //  $('.intro-quiz').hide();
      
         // Afficher la première diapositive de question
         $('.question-slide').first().show();
     });
  
     // Clic sur le bouton "Suivant"
     $('.next-button').click(function(){
         // Récupérer la diapositive actuelle
         var currentSlide = $(this).closest('.question-slide');
      
         // Masquer la diapositive actuelle
         currentSlide.hide();
      
         //Afficher la diapositive suivante
         currentSlide.next('.question-slide').show();
     });
});

//####################################################################################"
    //##fonction de changement de quetion                                             ####
    function  setForm (question, reponse, nbreQuiz) {
        // ./resources/assets/game/Batgame_ 
        $('#img-illustrate').attr("src", "Illustrations2/Batgame_" + (2 + nbreQuiz) + ".png");
        $('#number-quiz').text(nbreQuiz);
        $('#quiz-question').empty();
        $('#quiz-question').append("<p class ='question' id = 'question' ></p>");
        $('#quetion').text(question);
        for (let i = 0; i < reponse.length; i++) {
            $('#quiz-question').append("<label for = 'checkbox" + i + "'class ='response' id='"+ i +"'></label");//a completer
            $('#' + i).append("<input type = 'checkbox' name='choix' id='checkbox" + i +"'>");
            $('#' + i).append("<p id = 'response" + i + "'>" + reponse[i].text + "</p>" );
            
        }
        $('#quiz-question').append("<span id='error-message'></span>");


    }
//######################################################################
//## Fonction de verification si user choisi une reponse             ###
//######################################################################
function isChooseResponse ( questions,currentQuiz) {
    //variable local
    let notChoose = true;
    let userResponse = false;
    // contole si l'utilisateur a choisir une reponse
    for (let i = 0; i < questions[currentQuiz].reponse.length; i++) {
        if ($('#checkbox' + i).is(":checked")) {
            notChoose = false;
            userResponse = questions[currentQuiz].reponse[i].isGood;
            console.log(questions[currentQuiz].reponse[i].isGood);
        }
        
    }
    if (notChoose) {// si aucun reponse n;est chosie afficher un message d'erreur
        $('#error-message').css("colore", "red").text("Choisissez une reponse !");
        return [false, userResponse];

    }else{
        return [true, userResponse];
    }
    
} 

$.ajax({
    url: 'https://opentdb.com/api.php?amount=15&category=11&difficulty=easy&type=multiple',
    // url: 'https://superheroapi.com/api/access-token/character-id/biography',
    // 'https://octopus-app-2u6og.ondigitalocean.app/questions/all',

    datatype: 'json',
   
    success: function (questions) {
        console.log(question);
        // declaration des variables locale
        let totalPoint = 0;
         let currentQuiz = 0;   //index de la questions
        let totalQuiz = questions.length ;
        // fin variable locale
       
        // Affiche le nombre total de quiz
        $('#total-quiz').text(totalQuiz);
        
        // Initialise le formulaire avec la première question
        // setForm(questions[currentQuiz].question, questions[currentQuiz].question); // a completer
        setForm(questions[currentQuiz].question, questions[currentQuiz].reponse, currentQuiz + 1);

        // soumission de la reponse de l'utilisateur
        $('#formulaire').submit(function (e) {
            e.preventDefault();
            
            let chooeResponse = isChooseResponse(questions, currentQuiz) // a completer
            

            let isChoose = chooeResponse[0];
            let userResponse = chooeResponse[1];
            //si l'index de la question est inferieure au total
            if (currentQuiz < (totalQuiz - 1)) {
                if (isChoose) {// Sinon valider le formulaire
                    // $('#quiz-box').slideUp(1000).slideDown(1000);
                    currentQuiz++; //augmenter l'index de la question

                    setTimeout(() => {
                        if (currentQuiz < totalQuiz) {
                            setForm(questions[currentQuiz].question, questions[currentQuiz].response, (currentQuiz + 1 )); //a completer 
                        }
                        
                    }, 200);//1000
                    if (currentQuiz === totalQuiz) {// si l'index des quetion est egal
                        $('#btn-next').val('voir le resultat').attr("id", "btn-resume");
                        
                    }
                    console.log(userResponse);
                    totalPoint = userResponse === true ?(totalPoint + 1) :totalPoint;
                    userResponse = "false";
                    console.log(totalPoint);    
                }
                else{
                    if (isChoose) {
                        
                        // console.log(userResponse);
                        totalPoint = userResponse === true ? (totalPoint + 1 ) :totalPoint;
                        // console.log(totalPoint);
                        // Affichage des résultats
                        if (totalPoint <= (totalQuiz / 3)) {
                            $('#titre').text("0" + totalPoint + "/" + totalQuiz + "c'est pas");// a completer
                            $('#msg-result').text("Oula! Heureusement que le riddler est soumise" );// a completer
                            
                        }else if (totalPoint <= (totalQuiz / 2)) {
                            $('#titre').text( totalPoint + "/" + totalQuiz + " pas mal !");
                            $('#msg-result').text("Encore peu d'entrainement avec le cheval" );// a completer
                        }else{
                            $('#titre').text( totalPoint + "/" + totalQuiz + " bravo !");
                            $('#msg-result').text("Vous etes veritablement un fan de " );// a completer
                        }
                        $('#popup-result').css("display", "flex");
                    }
                }
            }
        });
        
    },
    error: function (questions) {
        // console.log(questions)
        console.log('impossible de se connecter')
        
    },
    


});




// animation de la souri
const bat = document.getElementById('bat');
document.body.addEventListener('mousemove', function(event) {
   
    const mouseX = event.pageX;
    const mouseY = event.pageY;
    
    bat.style.left = (mouseX - bat.clientWidth / 2) + 'px';
    bat.style.top = (mouseY - bat.clientHeight / 2) + 'px';
    bat.style.opacity = 1; // Rendre la chauve-souris visible en suivant la souris
    
    // Réduire progressivement l'opacité pour créer l'effet de fondu
    setTimeout(() => {
        bat.style.opacity = 0;
    }, 500); // 500ms avant de commencer à fondre
});

// Apparition progressive des éléments au fur et à mesure du scrolling, avec un effet fade
// in + slide de gauche à droite.
// $(window).on('scroll', function() {
//     $('.fade-slide').each(function() {

//         var elementTop = $(this).offset().top;
//         var viewportBottom = $(window).scrollTop() + $(window).height();
        
//         if (elementTop < viewportBottom - 60) { // Ajustez la valeur pour déclencher l'effet plus tôt ou plus tard
//             $(this).addClass('visible');
//         }
//     });
// });


