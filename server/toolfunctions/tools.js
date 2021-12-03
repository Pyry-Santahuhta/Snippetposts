module.exports = {
  getDateString: function () {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    var HH = today.getHours();
    var MM = today.getMinutes();
    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }
    if (MM < 10) {
      MM = "0" + MM;
    }
    today = dd + "." + mm + "." + yyyy + " " + HH + ":" + MM;
    return today;
  },
};
