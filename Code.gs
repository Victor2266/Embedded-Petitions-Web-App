var GoogleSpreedSheetURL_ForPetition = "https://docs.google.com/spreadsheets/d/1p-iTszPZOyIbwHkQxb5DmUa5uOJdBAj-5rHG6Erz8ig/edit#gid=0";

var Cell_CurrentSignitureCount = 'J2';
var Cell_RemainingNeeded = 'K2';
var Cell_EndGoal = 'L2';
var Cell_Percentage = 'M2';
var SheetName = "Sheet1";

function doGet(e){
  var tmp = HtmlService.createTemplateFromFile("page");
  tmp.title = returnProgressSummary();
  tmp.remainingSigns = returnRemaining();
  tmp.percentage = returnPercentage();
  tmp.numberSigned = returnTotalNumber();
  tmp.goalNumber = returnGoalNumber();

  return tmp.evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function returnProgressSummary(){
  var value = "<b>"+ returnTotalNumber() + "</b> have signed. Let's get to <b>"+ returnGoalNumber() +"</b>!"
  Logger.log("Refreshed page: " + value);

  return value;
}

function getCellData(cellName){
  var url = GoogleSpreedSheetURL_ForPetition;
  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName(SheetName);

  var value = ws.getRange(cellName).getValue();
  Logger.log("Got Data from: " + cellName + " = " + value);

  return value;
}
function returnRemaining(){
  return getCellData(Cell_RemainingNeeded);
}

function returnPercentage(){
  return "width: "+ getCellData(Cell_Percentage) * 100 +"%";
}

function returnTotalNumber(){
  return getCellData(Cell_CurrentSignitureCount)
}

function returnGoalNumber(){
  return getCellData(Cell_EndGoal)
}

function include(filename){
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
