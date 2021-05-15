var UserProfile = (function() {
  var full_name = sessionStorage.getItem('smartDinerUserName');

  var getToken = function() {
    // return sessionStorage.getItem('token');    // Or pull this from cookie/localStorage
    // return localStorage.getItem('token');
  };

  var getName = function() {
    return full_name;    // Or pull this from cookie/localStorage
  };

  var setName = function(name) {
    full_name = name;
    sessionStorage.setItem('smartDinerUserName', full_name);
    // Also set this in cookie/localStorage
  };

  var clearUser = function(){
    localStorage.removeItem('token');
  }

  return {
    getName: getName,
    setName: setName,
    clearUser: clearUser,
    getToken: getToken
  }

})();

export default UserProfile;