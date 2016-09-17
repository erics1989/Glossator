function convert(jhash) {
  var return_s = "<ul>\n";
  for (var i = 0; i < jhash["results"].length; i++) {
    var headword = jhash["results"][i]["headword"];
    return_s += "  <li><span class=\"headword\">" + headword + "</span>";
    var pos = "(" + jhash["results"][i]["part_of_speech"] + ")";
    return_s += "    <span class=\"part_of_speech\">" + pos + "</span></li>\n";
    return_s += "    <ol>\n";
    for (var j = 0; j < jhash["results"][i]["senses"].length; j++) {
      var def = jhash["results"][i]["senses"][j]["definition"];
      return_s += "      <li><span class=\"definition\">" + def + "</span></li>\n";
    }
    return_s += "    </ol>\n";
  }
  return_s += "</ul>"
  return return_s
}

$( "span.pword" )
  .click(function() {
    console.log($(this).attr('name'))
    var pathstring = "http://api.pearson.com/v2/dictionaries/lasde/entries?headword="
    var lemma = $(this).attr('name')

    $.get(pathstring.concat(lemma),
      function( data ) {
        var defin = convert(data);
        /*$( "div.defbox" ).replaceWith( defin );*/
        $("div.defbox").html(defin);
      }
    );

    /* $( "div.defbox" ).replaceWith( self.text() ); */
  })

