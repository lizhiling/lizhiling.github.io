$(function() {
    calMain();
});

function calMain() {
    let retireYear = document.getElementById("retireAge").value;
    let currentYear = document.getElementById("currentAge").value;

    console.log("现在年龄：" + currentYear);
    console.log("退休年龄：" + retireYear);
    calForYearlySaving(calForWholeSaving(retireYear), retireYear, currentYear);
}


function calForWholeSaving(retireYear){
    const cpfLifeYear = 65;
    let cpfLifeSaving = 280 * 1000;

    let lifeCostPerMonthAfterRetirement = document.getElementById("monthlyCost").value;

    const forParentYears = 25;
    let numberOfParents = 2;

    let forParentPerMonth = document.getElementById("parentCost").value;

    let houseInstallment = document.getElementById("houseInstallment").value;
    let houseInstallmentUntilYear = document.getElementById("houseInstallmentUntilYear").value;


    let amount = calSavingForHouse(houseInstallment, houseInstallmentUntilYear, retireYear)
        + calSavingForParents(forParentYears, numberOfParents, forParentPerMonth)
        + calSavingForLifeCost(lifeCostPerMonthAfterRetirement, cpfLifeYear, retireYear)
        + calSavingForCpfSaving(cpfLifeSaving);
    document.getElementById("totalSaving").innerHTML = to10Thousands(amount);
    return amount;
}

function calForYearlySaving(wholeSavingNeeded, retireYear, currentYear) {
    let yearlySaving = wholeSavingNeeded / (retireYear - currentYear);

    document.getElementById("yearlySaving").innerHTML = to10Thousands(yearlySaving);
    return yearlySaving;
}


function calSavingForHouse(houseInstallment, houseInstallmentUntilYear, retireYear){
    let amount = (houseInstallmentUntilYear - retireYear) * houseInstallment * 12;
    document.getElementById("installmentAmount").innerHTML = to10Thousands(amount);
    return amount;
}

function calSavingForParents(forParentYears, numberOfParents, forParentPerMonth){
    let amount = (forParentYears * numberOfParents * forParentPerMonth * 12);
    document.getElementById("parentAmount").innerHTML = to10Thousands(amount);
    return amount;
}

function calSavingForLifeCost(lifeCostPerMonthAfterRetirement, cpfLifeYear, retireYear){
    let amount =  (cpfLifeYear - retireYear) * 12 * lifeCostPerMonthAfterRetirement;
    document.getElementById("dailyAmount").innerHTML = to10Thousands(amount);
    return amount;
}

function calSavingForCpfSaving(cpfLifeSaving){
    document.getElementById("cpfLifeAmount").innerHTML = to10Thousands(cpfLifeSaving);
    return cpfLifeSaving;
}

function to10Thousands(amount) {
    return "$ "+(amount/10000).toFixed(2)+" 万";
}
