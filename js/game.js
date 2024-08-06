
// #################################################
// cliquer sur le boutton demarrer le quize 
$('#btn-start').click(function(){
    $('#quiz-box').slideDown(1000);
    $('#intro-quiz').slideUp(2000);  
});
// fin bouton demarrarer

//Effet scroll
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
//fin effet scroll
// ########################################################

$.ajax({
    url: 'https//octopus-app-2u6og.ondigitalocean.app/questions/all',
    datatype: 'json',
    success: function (questions) {

        // declaration des variables locale
        let totalPoint = 0;
         let currentQuiz = 0;   //index de la questions
        let totalQuiz = questions.length ;
        // fin variable locale

        $('total-quiz').text(totalQuiz);
        setForm(questions[currentQuiz].question, questions[currentQuiz].question); // a completer

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
                    currentQuiz++; //augmenter

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
                        
                        console.log(userResponse);
                        totalPoint = userResponse === true ? (totalPoint + 1 ) :totalPoint;
                        console.log(totalPoint);
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
        console.log(questions)
        
    },
    


});
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

    //####################################################################################"
    //##fonction de changement de quetion                                             ####
    function  setForm(question, reponse, nbreQuiz) {
        $('#img-illustrate').attr("src", "./resources/assets/game/Batgame_" + (2 + nbreQuiz) + ".png");//a completer
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

    
}


