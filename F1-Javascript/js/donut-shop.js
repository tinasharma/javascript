function DonutShop(shopLocation,minCustomersPerHr, maxCustomersPerHr, avgDonutsPerCustomer)
{
	this.hrsOfOp = 15;	//Hours of operation for each donut shop is fixed from 6 am to 9 pm
	this.shopLocation = shopLocation;
	this.minCustomersPerHr = minCustomersPerHr;	//this is minimum customer per hour
	this.maxCustomersPerHr = maxCustomersPerHr; //this is maximum customer per hour
	this.avgDonutsPerCustomer = avgDonutsPerCustomer; // this is the average number of donuts per customer per hour

	/*it generates random number of customers per hour using the minimum and maximum number of customers per hour */
	this.custPerHr = Math.floor((Math.random() * (this.maxCustomersPerHr - this.minCustomersPerHr + 1)) + this.minCustomersPerHr);
 
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
		this.locationName=locationName;
		this.minCustomersPerHr=minCustomersPerHr;
		this.maxCustomersPerHr=maxCustomersPerHr;
		this.avgDonutsPerCustomer=avgDonutsPerCustomer;
		

		this.listOfLocations[this.listOfLocations.length] = new DonutShop(locationName,minCustomersPerHr,maxCustomersPerHr,avgDonutsPerCustomer);

	};

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

		for(var i=0;i<this.listOfLocations.length;i++)
		{
			this.row = this.table.insertRow();
			this.cell1 = this.row.insertCell(0);
			this.cell2 = this.row.insertCell(1);
			this.cell3 = this.row.insertCell(2);
			this.cell1.innerHTML = this.listOfLocations[i].shopLocation;
			this.cell2.innerHTML = this.listOfLocations[i].getDonutsPerHour();
			this.cell3.innerHTML = this.listOfLocations[i].getDonutsPerDay();
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
	

