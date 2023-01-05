/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

var jpdbBaseURL = "http://api.login2explore.com:5577";
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";
var stdDBName = "STD-DB";
var stdRelationName = "stdData";
var connToken = "90938142|-31949270512195759|90955069";


$("#stdId").focus();

function saveRecNo2LS(jsonObj){
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("recon",lvData.rec_no);
}

function saveData(){
    $("#stdId").val(" ");
    $("#stdName").val(" ");
    $("#stdClass").val(" ");
    $("#stddob").val(" ");
    $("#stdaddress").val(" ");
    $("#stdedate").val(" ");
    $("#stdId").prop("disabled",false);
    $("#save").prop("disabled",true);
    $("#update").prop("disabled",true);
    $("#reset").prop("disabled",true);
    $("#stdid").focus();
}
function resetData(){
    $("#stdId").val(" ");
    $("#stdName").val(" ");
    $("#stdClass").val(" ");
    $("#stddob").val(" ");
    $("#stdaddress").val(" ");
    $("#stdedate").val(" ");
    $("#stdId").prop("disabled",false);
    $("#save").prop("disabled",true);
    $("#update").prop("disabled",true);
    $("#reset").prop("disabled",true);
    $("#stdid").focus();
}
function saveData(){
    var jsonStrObj= validateDate();
    if(jsonStrObj == " "){
        return " ";
    }
    var putRequest = createPUTRequest(connToken, jsonStrObj, stdDBName,stdRelationName);
    jQuery.ajaxSetup({async: false});
    var resJsonObj=executeCommandAtgivenBaseUrl(putREquest,jpdbBaseURL,JpdbIML);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $("#stdId").focus();
}

function validation(){
    var stdId,stdName,stdClass,stddob,stdaddress,stdedate;
    stdId=$("#stdId").val();
    stdName=$("#stdName").val();
    stdClass=$("#stdClass").val();
    stddob=$("#stddate").val();
    stdaddress=$("#stdaddress").val();
    stdedate=$("#stdedate").val();
    deduct=$("#deduct").val();
    
    if(stdId==" "){
        alert("student id missing");
        $("#stdId").focus();
        return " ";
    }
    if(stdName==" "){
        alert("student name missing");
        $("#stdName").focus();
        return " ";
    }
    if(stdClass==" "){
        alert("student class missing");
        $("#stdClass").focus();
        return " ";
    }
    if(stddob==" "){
        alert("student date of birth missing");
        $("#stddob").focus();
        return " ";
    }
    if(stdaddress==" "){
        alert("student address missing");
        $("#stdadddress").focus();
        return " ";
    }
    if(stdedate==" "){
        alert("student enrollment date missing");
        $("#stdedate").focus();
        return " ";
    }
    var jsonStrObj={
        id:stdId,
        name:stdName,
        class:stdClass,
        birth:stddob,
        address:stdaddress,
        edate:stdedate
    };
    return JSON.stringify(jsonStrObj);
}
function updateData(){
    $("#update").prop("disabled",true);
    jsonDpt = validateData();
    var updateRequest = createUPDATERecordRequest(connToken,jsonDpt,stdDBName,empRelationName,localStorage.getItem(""))
    jQuery.ajaxSetup({async:false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest,jpdbBaseURL,jpdbIML);
    jQuery.ajax({async:true});
    console.log(resjsonObj);
    resetForm();
    $("#stdId").focus();
    
}
function getStd(){
    var stdIdjsonObj = getstdIdASjsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken,stdDBName,stdRelationName,stdIdjsonObj);
    jQuery.ajaxSetup({async:false});
    var resjsonObj = executeCommandAtGivenBaseUrl(getRequest,jpdbBaseURL,jpdbIRL);
    jQuery.ajaxSetup({async:true});
    if(resjsonObj.status===400){
        $("#save").prop("disable",false);
        $("#reset").prop("disable",false);
        $("#stdName").focus();
    }
    else if(resjsonObj.status===200){
        $("#stdId").prop("disabled",true);
        fillData(resJsonObj);
        $("#update").prop("disable",false);
        $("#reset").prop("disable",false);
        $("#stdName").focus();
    }
}