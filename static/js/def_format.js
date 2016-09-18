function convert(word, jhash) {
  if (jhash["results"].length == 0) {
    var nodef = "No definition found for \"" + word + "\".";
    return "<span class=\"nodef\">" + nodef + "</span>\n";
  }


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

/*
function translate(jhash) {
  var return_s = "<ul>\n";
  for (var i = 0; i < jhash["results"].length; i++) {
    var headword = jhash["results"][i]["headword"];
    return_s += "  <li><span class=\"headword\">" + headword + "</span>";
    var pos = "(" + jhash["results"][i]["part_of_speech"] + ")";
    return_s += "    <span class=\"part_of_speech\">" + pos + "</span></li>\n";
    return_s += "    <ol>\n";
    for (var j = 0; j < jhash["results"][i]["senses"].length; j++) {
      var def = jhash["results"][i]["senses"][j]["translation"];
      return_s += "      <li><span class=\"definition\">" + def + "</span></li>\n";
    }
    return_s += "    </ol>\n";
  }
  return_s += "</ul>"
  console.log(return_s)
  return return_s
}
*/


$( "span.pword" ).click(function() {

    word = $(this).attr('name')
    // For now, we only care about NOUN, VERB
    //ADP, ADV, AUX, CONJ, DET, INTJ, NOUN, NUM, PART,
    //PRON, PROPN, PUNCT, SCONJ, SYM, VERB, X, EOL, SPACE
    pos_list = ["noun", "verb", "adj", "adv"]

    var base = "http://api.pearson.com/v2/dictionaries/lasde/entries?headword="
    pathstring = base.concat(word)
    // token_category is one of [VERB, NOUN, ADJ, etc...]
    var token_category = $(this).attr("pos").toLowerCase()

    if (token_category == "punct") {
        return
    }

    if (pos_list.includes(token_category)) {
        if (token_category == "adj") {
            token_category = "adjective"
        } else if (token_category == "adv") {
            token_category = "adverb"
        }
        pathstring = pathstring.concat("&part_of_speech=" + token_category)
    }

    $.get(pathstring, function(data) {
        if (data["results"].length != 0) {
            var defin = convert(word, data);
            $("div.defbox").html(defin);
        } else {
            // else we do this ugly method where we do another get method
            // and modify the defbox if the more broader query works...
            retry_pathstring = base.concat(word)
            $.get(retry_pathstring, function(retry_data) {
                if (retry_data["results"].length != 0) {
                    var retry_defin = convert(word, retry_data);
                    $("div.defbox").html(retry_defin);
                }
            })
        }

    });

    /* $( "div.defbox" ).replaceWith( self.text() ); */
  }
)

/*
$( "span.pword" )
  .click(function() {
    console.log($(this).attr('name'))
    var word = $(this).attr('name')
    var pathstring = "http://api.pearson.com/v2/dictionaries/lasde/entries?headword="
    pathstring = pathstring.concat(word)
    

    $.get(
      pathstring,
      function( data ) {
        var defin = convert(word, data);
        $("div.defbox").html(defin);
      }
    );
  })
*/

