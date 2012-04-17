module.exports = { 
  csrf: function(req, res){
      return req.session ? req.session._csrf : '';
    },

    session: function (req, res){
      return req.session;
    },

    flash: function(req, res){
      var flash = req.flash(),
          html = '',
          type;
      for (type in flash){
        if (flash.hasOwnProperty(type)){
          html += '<div class="' + type + '">';
          flash[type].forEach(function(val){
            html += '<span>' + val + '</span>';
          });
          html += '</div>'; 
        };
      };
      return html;
    }  
};