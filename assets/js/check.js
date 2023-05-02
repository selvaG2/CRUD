function userCreate(){
   const  pname = document.getElementById("PatientName").value;
   const age = document.getElementById("Age").value;
   const sex = document.getElementById("Sex").value;
   const visitingdate = document.getElementById("VisitingDate").value;
   const complaint = document.getElementById("Complaint").value;


   if(validate()==true){
    const xhttp = new XMLHttpRequest();
   xhttp.open("POST", "http://localhost:3000/company");
   xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
   xhttp.onreadystatechange = function (){
    if(this.readyState == 4 && this.status == 200){
        const objects = JSON.parse(this.responseText);
        Swal.fire(objects["message"]);
        
    }
}
   xhttp.send(
     JSON.stringify({
       company_name: company_name,
       type: type,
       address: address,
       contact: contact,
       email: email,
       logo: logo,
     })
   );
   render();

   }
   else{
Swal.fire({
    title:"User creation unsuccessful",
    icon:success
})
   }
   
}
