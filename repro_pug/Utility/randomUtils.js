const faker = require('faker')

  const randUrl = () => {
     return faker.internet.url();
  }

  function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  function randomPropertyNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  const randomAgentPosition = () => {
    var myArray = [
      "Agent",
      "Estate Advisor",
      "Realtor"
    ];
    return  myArray[Math.floor(Math.random()*myArray.length)];

  }

  const randomRepPosition = () => {
    var myArray = [
      "Agent",
      "Sales Manager",
      "Sales Rep",
      "Realtor"
    ];
    return  myArray[Math.floor(Math.random()*myArray.length)];
  }

    const AgentCompany = () => {
      var myArray = [
        "Real Properties"
      ];
      return  myArray[Math.floor(Math.random()*myArray.length)];

    }

      const RepCompany = () => {
        var myArray = [
          "Real Properties",
          "Sales Manager",
          "Sales Rep",
          "Realtor"
        ];
        return  myArray[Math.floor(Math.random()*myArray.length)];

  }

  const propertyType = () => {
    var myArray = [
"Flat",
"Duplex",
"Bungalow",
"TownHouse",
"PentHouse",
"Office Space",
"Retail",
"Warehouse",
"Shop",
"Villa",
"Showroom",
"Full Floor",
"Half Floor",
"Whole Building",
"Land",
"Bulk Sale Unit",
"Factory",
"Hotel and Apartment",
"Labour Camp",
"Staff Accomodation",
"Business Centre",
"Co-Working Space",
"Farm"
    ];
    return  myArray[Math.floor(Math.random()*myArray.length)];

}
      
  const AgentPicsUrl = () => {
    var myArray = [
      "https://i.ibb.co/hmkz0xB/agent1.jpg",
      "https://i.ibb.co/p0W7F8r/Portrait-of-real-black-african-woman-with-no-expression-ID-or-passport-photo-full-collection-of-dive.jpg",
      "https://i.ibb.co/vsBVZnd/agent3.jpg"
    ];
    return  myArray[Math.floor(Math.random()*myArray.length)];

  }

  const housePicsUrl = () => {
    var myArray = [
      "https://i.ibb.co/txGwBDh/house1.jpg",
      "https://i.ibb.co/d6JNxfd/house2.jpg",
      "https://i.ibb.co/RP5W9hB/house3.jpg",
      "https://i.ibb.co/qCM52fH/house4.jpg",
      "https://i.ibb.co/kg43GjF/house5.jpg",
      "https://i.ibb.co/VYv4mg2/house6.jpg",
      "https://i.ibb.co/g4P4Bwd/house7.jpg",
      "https://i.ibb.co/6vg492Q/house8.jpg"

    ];
    return  myArray;
    //return  myArray[Math.floor(Math.random()*myArray.length)];

  }




  module.exports ={
    randomNumber:randomNumber,
    randomPropertyNumber:randomPropertyNumber,
    randomAgentPosition:randomAgentPosition,
    randomRepPosition:randomRepPosition,
    AgentCompany:AgentCompany,
    RepCompany:RepCompany,
    AgentPicsUrl:AgentPicsUrl,
    propertyType:propertyType,
    randUrl:randUrl
  }