module.exports = { 
  
  /**
   * csrf protection
   * @ checks for csrf on every POST request
   **/

  csrf: function(req, res){
      return req.session ? req.session._csrf : '';
    },


  /**
   * session local
   **/

  session: function (req, res){
      return req.session;
    },


  /**
   * combine flash messages & pretty html output
   **/

  flash: function(req, res){
      var flash = req.flash(),
          html = '',
          type;
      for (type in flash){
        if (flash.hasOwnProperty(type)){
          html += '<div class="flash ' + type + '">';
          flash[type].forEach(function(val){
            html += '<span>' + val + '</span>';
          });
          html += '</div>'; 
        };
      };
      return html;
    }  

};