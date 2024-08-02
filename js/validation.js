window.onload = () =>{
    let myform = document.getElementById('myform');
    myform.addEventListener('submit',function(e){
        let email = document.getElementById('email');
        if (email.value == '') {
            e.preventDefault();
            let invalid = document.getElementById('invalid');
            invalid.innerHTML = 'Le champ ne peut pas etre vide';
            invalid.style.color = "red";
        }else{
         e.preventDefault();
        // console.log('Ca marche');
        document.getElementById('popupbox').style.display = 'block';
        }
    });
}