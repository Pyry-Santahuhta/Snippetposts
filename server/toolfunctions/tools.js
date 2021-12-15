//Tool functions for the back end

module.exports = {
  //This function returns the current date in dd.mm.yyyy HH:MM format. Used for timestamps
  getDateString: function () {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    var HH = today.getHours();
    var MM = today.getMinutes();
    //Add leading zero to days, months, hours and minutes if they are missing under 10.
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    if (HH < 10) {
      HH = "0" + HH;
    }
    if (MM < 10) {
      MM = "0" + MM;
    }
    today = dd + "." + mm + "." + yyyy + " " + HH + ":" + MM;
    return today;
  },
};
