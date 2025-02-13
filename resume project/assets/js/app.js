// regex for validation
const strRegex =  /^[a-zA-Z\s]*$/; // containing only letters
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
/* supports following number formats - (123) 456-7890, (123)456-7890, 123-456-7890, 123.456.7890, 1234567890, +31636363634, 075-63546725 */
const digitRegex = /^\d+$/;


const mainForm = document.getElementById('cv-form');
let firstnameElem = mainForm.firstname;
let middlenameElem = mainForm.middlename;
let lastnameElem = mainForm.lastname;
let imageElem = mainForm.image;
let designationElem = mainForm.designation;
let addressElem = mainForm.address;
let emailElem = mainForm.email;
let phonenoElem = mainForm.phoneno;
let summaryElem = mainForm.summary;



//first value is for the attributes and second passes the nodelists
const fetchValues = (attrs, ...NodeLists) => {

    let elemsAttrsCount = NodeLists.length;
    let elemsDataCount = NodeLists[0].length;
    let tempDataArr = [];



    //firs loop deals with the no of repeaters value
    for(let i=0; i<elemsDataCount; i++){
      let dataObj = {}; // creating an empty object fill the data


     
      //second loop fetches the data for each repeaters value or attributes
      for(let j=0; j<elemsAttrsCount; j++){

        if(NodeLists[j] && NodeLists[j][i]){
           //setting the key name for the object and fill it with data
           dataObj[`${attrs[j]}`] = NodeLists[j][i].value;
        }else{
          console.error(`Hata:NodeLists[${j}][${i}] bulunamadı`);
        }
      
      }
      tempDataArr.push(dataObj);
    }
 return tempDataArr;
}

const getUserInputs = () => {


  // achievements
  let achievementsTitleElem = document.querySelectorAll('.achieve-title');
  let achievementsDescriptionElem = document.querySelectorAll('.achieve_description');


  //experience
  let expTitleElem = document.querySelectorAll('.exp_title');
  let expOrganizationElem = document.querySelectorAll('.exp_organization');
  let expLocationElem = document.querySelectorAll('.exp_location');
  let expStartDateElem = document.querySelectorAll('.exp_start_date');
  let expEndDateElem = document.querySelectorAll('.exp_end_date');
  let expDescriptionElem = document.querySelectorAll('.exp_description');
 

  //education

  let eduSchoolElem = document.querySelectorAll('.edu_school');
  let eduDegreeElem = document.querySelectorAll('.edu_degree');
  let eduCityElem = document.querySelectorAll('.edu_city');
  let eduStartDateElem = document.querySelectorAll('.edu_start_date');
  let eduGraduationDateElem =document.querySelectorAll('.edu_graduation_date');
  let eduDescriptionElem = document.querySelectorAll('.edu_description');





  return{
    firstname: firstnameElem.value,
    middlename: middlenameElem.value,

    lastname: lastnameElem.value,
    designation: designationElem.value,
    address: addressElem.value,
    email: emailElem.value,
    phoneno: phonenoElem.value,
    summary: summaryElem.value,
    achievements: fetchValues(['.achieve_title', '.achieve_description'], achievementsTitleElem, achievementsDescriptionElem),

    experiences: fetchValues(['.exp_title', '.exp_organization','.exp_location','.exp_start_date','.exp_end_date','.exp_description'],
      expTitleElem,expOrganizationElem,expLocationElem,expStartDateElem,expEndDateElem,expDescriptionElem),
      educations: fetchValues(['.edu_school', '.edu_degree', '.edu_city', '.edu_start_date', '.edu_graduation_date', '.edu_description'],
        eduSchoolElem, eduDegreeElem, eduCityElem, eduStartDateElem, eduGraduationDateElem, eduDescriptionElem),


      

  }
}


const generateCV = () => {
  let userData = getUserInputs();
  console.log(userData);
}


