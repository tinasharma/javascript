$(document).ready(function(){

  $('#myTable #cell1').click(function(){
     $(this).siblings().css('opacity', 1.0);
  });

});

function DonutShop(shopLocation,minCustomersPerHr, maxCustomersPerHr, avgDonutsPerCustomer)
{
  this.hrsOfOp = 15;  //Hours of operation for each donut shop is fixed from 6 am to 9 pm
  this.shopLocation = shopLocation;
  this.minCustomersPerHr = minCustomersPerHr; //this is minimum customer per hour
  this.maxCustomersPerHr = maxCustomersPerHr; //this is maximum customer per hour
  this.avgDonutsPerCustomer = avgDonutsPerCustomer; // this is the average number of donuts per customer per hour

  this.calculateCustPerHr = function(){
  /*it generates random number of customers per hour using the minimum and maximum number of customers per hour */
  this.custPerHr = Math.floor((Math.random() * (this.maxCustomersPerHr - this.minCustomersPerHr + 1)) + this.minCustomersPerHr);
  };

  //this function calculates and returns the total number of donuts need to be baked per hour
  this.getDonutsPerHour = function()
  {
    this.total = this.custPerHr * this.avgDonutsPerCustomer;
    return Math.ceil(this.total);
  };

  //this function calculates and returns the total number of donuts need to be baked per hour
  this.getDonutsPerDay = function()
  {
    this.total = this.custPerHr * this.avgDonutsPerCustomer * this.hrsOfOp;
    return Math.ceil(this.total);
  };

}

function DonutMaster()
{
  this.listOfLocations = [];

  this.addShop= function(locationName, minCustomersPerHr, maxCustomersPerHr, avgDonutsPerCustomer)
  {
    var shop = new DonutShop(locationName, minCustomersPerHr, maxCustomersPerHr, avgDonutsPerCustomer);

        this.listOfLocations.push(shop);

  };

  var that = this;

  this.generateReport = function()
  {
    this.table = document.getElementById("myTable");
    this.row = this.table.insertRow(0);

    this.cell1 = this.row.insertCell(0);
    this.cell1.innerHTML = "Location Name";

    this.cell2 = this.row.insertCell(1);
    this.cell2.innerHTML = "Donuts Per Hour";

    this.cell3 = this.row.insertCell(2);
    this.cell3.innerHTML = "Donuts Per Day";

    this.cell4 = this.row.insertCell(3);
    this.cell4.innerHTML = "Minimum Customers";

    this.cell5 = this.row.insertCell(4);
    this.cell5.innerHTML = "Maximum Customers";

    this.cell6 = this.row.insertCell(5);
    this.cell6.innerHTML = "Re-generate Report";

    for (var i = 0; i < this.listOfLocations.length; i++) {
      $("tbody").append("<tr id='row" + i + "'></tr>");
      $("#row" + i).append("<td id='cell1'> " + this.listOfLocations[i].shopLocation + "  </td>");

      this.listOfLocations[i].calculateCustPerHr();

      $("#row" + i).append("<td id='cell2'> " + this.listOfLocations[i].getDonutsPerHour() + "  </td>");

      $("#row" + i).append("<td id='cell3'> " + this.listOfLocations[i].getDonutsPerDay() + "  </td>");

      $("#row" + i).append("<td id='cell4'><input type=text class='details' data-group=" + i + " placeholder=Min name='minCust'" + i + "></td>");

      $("#row" + i).append("<td id='cell5'><input type=text class='details' data-group=" + i + " placeholder=Max name='maxCust'" + i + "></td>");

      $("#row" + i).append("<td id='cell6'><button class=details data-group=" + i + " id=btn" + i + ">Re-generate</button></td>");

      $('#btn' + i).on("click", function(e){
          e.preventDefault();
          var group = $(this).attr("data-group");

          var minCust = $("[name=minCust][data-group= " + group + "]").val();
          var maxCust = $("[name=maxCust][data-group= " + group + "]").val();

          that.listOfLocations[group].minCustomersPerHr = minCust;
          that.listOfLocations[group].maxCustomersPerHr = maxCust;

          that.listOfLocations[group].calculateCustPerHr();

          $("#row" + group).children("#cell2").text(that.listOfLocations[group].getDonutsPerHour());
          $("#row" + group).children("#cell3").text(that.listOfLocations[group].getDonutsPerDay());

          console.log("The new value for the location " + that.listOfLocations[group].shopLocation + " donuts per hour is " + that.listOfLocations[group].getDonutsPerHour());
          console.log("The new value for the location " + that.listOfLocations[group].shopLocation + " donuts per day is " + that.listOfLocations[group].getDonutsPerDay());
      });

      console.log(this.listOfLocations[i].shopLocation, this.listOfLocations[i].getDonutsPerHour(), this.listOfLocations[i].getDonutsPerDay());
    }
  };

  }




  var donutMaster = new DonutMaster();
  donutMaster.addShop("Downtown",8,43,4.50);
  donutMaster.addShop("Capitol Hill",4,37,2.00);
  donutMaster.addShop("South Lake Union",9,23,6.33);
  donutMaster.addShop("Wedgewood",2,28,1.25);
  donutMaster.addShop("Ballard",8,58,3.75);

  donutMaster.addShop("Bothell",4,39,3.00);

  donutMaster.generateReport();


