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

function translate(word, jhash) {
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
    return_s += "    <ul>\n";
    for (var j = 0; j < jhash["results"][i]["senses"].length; j++) {
      var def = jhash["results"][i]["senses"][j]["translation"];
      return_s += "      <li><span class=\"definition\">" + def + "</span></li>\n";
    }
    return_s += "    </ul>\n";
  }
  return_s += "</ul>"
  console.log(return_s)
  return return_s
}

$( "span.pword" ).mouseover(function() {
  console.log("hello")
  var dictionary = $("select.language-select").val()
  console.log(dictionary) 
  if (dictionary === "english") {
    var word = $(this).attr('name')
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

$( "span.word").each(function() {
    $(this).css("background-color", "transparent");
});
$( "span[name=" + word + "]" ).each(function() {
    $(this).css("background-color", "#eee8d5");
});



            var defin = convert(word, data);
            $("div.defbox").html(defin);
        } else {
            // else we do this ugly method where we do another get method
            // and modify the defbox if the more broader query works...
            retry_pathstring = base.concat(word)
            $.get(retry_pathstring, function(retry_data) {
                //if (retry_data["results"].length != 0) {


$( "span.word").each(function() {
    $(this).css("background-color", "transparent");
});
$( "span[name=" + word + "]" ).each(function() {
    $(this).css("background-color", "#eee8d5");
});


                    var retry_defin = convert(word, retry_data);
                    $("div.defbox").html(retry_defin);
                //}
            })
        }

    });


  } else if (dictionary === "chinese") {
    var word = $(this).attr('name')
    // For now, we only care about NOUN, VERB
    //ADP, ADV, AUX, CONJ, DET, INTJ, NOUN, NUM, PART,
    //PRON, PROPN, PUNCT, SCONJ, SYM, VERB, X, EOL, SPACE
    pos_list = ["noun", "verb", "adj", "adv"]

    var base = "http://api.pearson.com/v2/dictionaries/ldec/entries?headword="
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


$( "span.word").each(function() {
    $(this).css("background-color", "transparent");
});
$( "span[name=" + word + "]" ).each(function() {
    $(this).css("background-color", "#eee8d5");
});


            var defin = translate(word, data);
            $("div.defbox").html(defin);
        } else {
            // else we do this ugly method where we do another get method
            // and modify the defbox if the more broader query works...
            retry_pathstring = base.concat(word)
            $.get(retry_pathstring, function(retry_data) {
                //if (retry_data["results"].length != 0) {


$( "span.word").each(function() {
    $(this).css("background-color", "transparent");
});
$( "span[name=" + word + "]" ).each(function() {
    $(this).css("background-color", "#eee8d5");
});


                    var retry_defin = translate(word, retry_data);
                    $("div.defbox").html(retry_defin);
                //}
            })
        }

    });
  }
})


$(function() {

  // We can attach the `fileselect` event to all file inputs on the page
  $(document).on('change', ':file', function() {
    var input = $(this),
        numFiles = input.get(0).files ? input.get(0).files.length : 1,
        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    input.trigger('fileselect', [numFiles, label]);
  });

  // We can watch for our custom `fileselect` event like this
  $(document).ready( function() {
      $(':file').on('fileselect', function(event, numFiles, label) {

          var input = $(this).parents('.input-group').find(':text'),
              log = numFiles > 1 ? numFiles + ' files selected' : label;

          if( input.length ) {
              input.val(log);
          } else {
              if( log ) alert(log);
          }

      });
  });
  
});


