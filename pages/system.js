const pageMode = document.getElementById('pageMode');


let pageType = 'fill';

pageMode.onclick =()=>{
  console.log(pageType)
  if(pageType == 'fill'){
    pageType = 'A4'
    
    let pages =
    console.log()
    array.forEach(element => {
      
    });
  }else if(pageType == 'A4'){
    pageType = 'fill'
    document.getElementsByTagName('page').forEach(element => {
      element.size = 'fill'
    });
  }
}