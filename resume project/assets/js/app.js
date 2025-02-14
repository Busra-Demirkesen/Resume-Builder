
document.addEventListener('DOMContentLoaded', function() {

// regex for validation
const strRegex =  /^[a-zA-Z\s]*$/; // containing only letters
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
/* supports following number formats - (123) 456-7890, (123)456-7890, 123-456-7890, 123.456.7890, 1234567890, +31636363634, 075-63546725 */
const digitRegex = /^\d+$/;


const mainForm = document.getElementById('cv-form');

const validType = {
  TEXT:  'text',
  TEXT_EMP: 'text_emp',
  EMAIL: 'email',
  DIGIT: 'digit',
  PHONENO: 'phoneno',
  ANY: 'any',
}


//user input elements
let firstnameElem = mainForm.firstname;
let middlenameElem = mainForm.middlename;
let lastnameElem = mainForm.lastname;
let imageElem = mainForm.image;
let designationElem = mainForm.designation;
let addressElem = mainForm.address;
let emailElem = mainForm.email;
let phonenoElem = mainForm.phoneno;
let summaryElem = mainForm.summary;

//display elements

let nameDsp = document.getElementById('fullname_dsp'),
    imageDsp = document.getElementById('image_dsp'),
    phonenoDsp = document.getElementById('phoneno_dsp'),
    emailDsp = document.getElementById('email_dsp'),
    addressDsp = document.getElementById('address_dsp'),
    designationDsp = document.getElementById('designation_dsp'),
    summaryDsp = document.getElementById('summary_dsp'),
    projectsDsp = document.getElementById('projects_dsp'),
    achievementsDsp = document.getElementById('achievements_dsp'),
    skillsDsp = document.getElementById('skills_dsp'),
    educationsDsp = document.getElementById('educations_dsp'),
    experiencesDsp = document.getElementById('experiences_dsp');



    console.log(nameDsp,imageDsp,phonenoDsp,emailDsp,addressDsp,designationDsp,summaryDsp,projectsDsp,achievementsDsp,skillsDsp,educationsDsp,experiencesDsp);





//first value is for the attributes and second passes the nodelists
const fetchValues = (attrs, ...NodeLists) => {
  let elemsAttrsCount = NodeLists.length;
  let elemsDataCount = NodeLists[0]?.length || 0; // Eğer NodeLists[0] boşsa 0 yap

  let tempDataArr = [];

  for(let i = 0; i < elemsDataCount; i++){
      let dataObj = {}; 

      for(let j = 0; j < elemsAttrsCount; j++){
          if(NodeLists[j] && NodeLists[j][i] && NodeLists[j][i].value !== undefined) {
              dataObj[`${attrs[j]}`] = NodeLists[j][i].value;
          } else {
              console.warn(`Uyarı: NodeLists[${j}][${i}] bulunamadı veya boş`);
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


  // project

  let projTitleElem = document.querySelectorAll('.proj_title');
  let projLinkElem = document.querySelectorAll('.proj_link');
  let projDescriptionElem = document.querySelectorAll('.proj_description');

  //Skills
  let skillElem = document.querySelectorAll('.skill');


  //Event Listener for form validation

firstnameElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT, 'first Name'));

middlenameElem.addEventListener('keyup', (e) => validateFormData(e.target,validType.TEXT_EMP, 'Middle Name'));

lastnameElem.addEventListener('keyup', (e) => validateFormData(e.target,validType.TEXT, 'Last Name'));

phonenoElem.addEventListener('keyup', (e) => validateFormData(e.target,validType.PHONENO, 'Phone Number'));

emailElem.addEventListener('keyup', (e) => validateFormData(e.target,validType.EMAIL, 'Email'));

addressElem.addEventListener('keyup', (e) => validateFormData(e.target,validType.ANY, 'Address'));

designationElem.addEventListener('keyup', (e) => validateFormData(e.target,validType.TEXT, 'Designation'));



achievementsTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Title')));


achievementsDescriptionElem.forEach(item => 
  item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description'))
);




expTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Title')));

expOrganizationElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Organization')));

expLocationElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Location')));

expStartDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target, validType.ANY, 'Start Date')));

expEndDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target, validType.ANY, 'End Date')));

expDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));



eduSchoolElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'School')));

eduDegreeElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Degree')));

eduCityElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'City')));

eduStartDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target, validType.ANY, 'Start Date')));

eduGraduationDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target, validType.ANY, 'Graduation Date')));

eduDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));




projTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Title')));

projLinkElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Link')));

projDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));




skillElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Skill')));




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
    projects: fetchValues(['proj_title', 'proj_link','proj_description'],
      projTitleElem,projLinkElem,projDescriptionElem),


      

  }
}

function validateFormData(elem,elemType,elemName){

  //Checking for text string end non empty string
  if(elemType==validType.TEXT){
    if(!strRegex.test(elem.value) || elem.value.trim().length ==0) addErrMsg(elem,elemName);
    else removeErrMsg(elem);
  }

  //checking for only text strign
  if(elemType == validType.TEXT_EMP){
    if(!strRegex.test(elem.value)) addErrMsg(elem,elemName);
    else removeErrMsg(elem);
  }

  // checking for email
  if(elemType==validType.EMAIL){
    if(!emailRegex.test(elem.value) || elem.value.trim() == 0) addErrMsg(elem,elemName);
    else removeErrMsg(elem);
  }


  //checking for phone number

  if(elemType == validType.PHONENO){
    if(!phoneRegex.test(elem.value) || elem.value.trim().length == 0) addErrMsg(elem,elemName);
    else removeErrMsg(elem);
  }

  //checking for only empty
  if(elemType == validType.ANY){
    if(elem.value.trim().length == 0) addErrMsg(elem,elemName);
    else removeErrMsg(elem);
  }


}

// adding the invalid text
function addErrMsg(formElem, formElemName) {
  if (formElem.nextElementSibling) {
    formElem.nextElementSibling.innerHTML = `${formElemName} is invalid`;
  }
}



//removing the invalid text
function removeErrMsg(formElem) {
  if (formElem.nextElementSibling) {
    formElem.nextElementSibling.innerHTML = '';
  }
}


//show the list data
const showListData = (listData,listContainer) => {

    listContainer.innerText = '';
    listData.forEach(listItem => {
      let itemElem = document.createElement('div');
      itemElem.classList.add('preview-item');


      for(const key in listItem){
        let subItemElem = document.createElement('span');
        subItemElem.classList.add('preview-item-val');
        subItemElem.innerText = `${listItem[key]}`;
        itemElem.appendChild(subItemElem);
      }

      listContainer.appendChild(itemElem);
    })


}



const displayCV = (userData) => {
  nameDsp.innerText = userData.firstname + ' ' + userData.middlename + ' ' + userData.lastname;
  phonenoDsp.innerText = userData.phoneno;
  emailDsp.innerText = userData.email;
  addressDsp.innerText = userData.address;
  designationDsp.innerText = userData.designation;
  summaryDsp.innerText = userData.summary;
  showisData(userData.projects, projectsDsp);
  showisData(userData.achievements, achievementsDsp);
  showisData(userData.skills, skillsDsp);
  showisData(userData.educations, educationsDsp);
  showisData(userData.experiences, experiencesDsp);

}




// Generate CV
const generateCV = () => {
  let userData = getUserInputs();
  displayCV(userData);
  console.log(userData);
}


function previewImage(){

  let oFReader = new FileReader();
  oFReader.readAsDataURL(imageElem.files[0]);
  oFReader.onload = function(ofEvent){
    imageDsp.src = ofEvent.target.result;
  }


}








});