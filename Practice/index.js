function ValidNumber(nums){
   if(nums.length != 10){
    return false;
   }
   const firstDigit = nums[0];
   if(firstDigit != '9' && firstDigit != '8' && firstDigit != '7' && firstDigit != '6'){
      return false;
   }
   for (let i = 0; i < nums.length; i++) {
    if (nums[i] < '0' || nums[i] > '9') {
        return false;
    }
    return true;
}
}

const number = '6794975553';
if(!ValidNumber(number)){
    console.log('Not Valid');
}
else{
    console.log('Valid Number');
    
}