jQuery(document).ready(function(){
    lispsum.get_text();

    // This button will increment the value
    $('.qtyplus').click(function(e){
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        fieldName = $(this).attr('field');
        // Get its current value
        var currentVal = parseInt($('input[name='+fieldName+']').val());
        // If is not undefined
        if (!isNaN(currentVal)) {
            // Increment
            $('input[name='+fieldName+']').val(currentVal + 1);
        } else {
            // Otherwise put a 0 there
            $('input[name='+fieldName+']').val(0);
        }

        lispsum.get_text();

    });
    // This button will decrement the value till 0
    $(".qtyminus").click(function(e) {
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        fieldName = $(this).attr('field');
        // Get its current value
        var currentVal = parseInt($('input[name='+fieldName+']').val());
        // If it isn't undefined or its greater than 0
        if (!isNaN(currentVal) && currentVal > 0) {
            // Decrement one
            $('input[name='+fieldName+']').val(currentVal - 1);
        } else {
            // Otherwise put a 0 there
            $('input[name='+fieldName+']').val(0);
        }

        lispsum.get_text();

    });

    $('.options-container li').click(function(){
        $('.selected').removeClass('selected');
        $(this).addClass("selected");

        lispsum.get_text();
    });

    tagline_animation.init();
});

var tagline_count = 0;

var tagline_animation = 
{
    taglines : taglines,
    init: function () 
    {
        setTimeout(this.ease_out, 4000);
    },
    ease_out : function() 
    {
        // $(".tagline").transition({ opacity: 0, y : "-10px" }, 500, 'out', function() {
        $(".tagline").fadeOut("fast", function() {  
            tagline_animation.ease_in();
            tagline_animation.update_text();
        });
    },
    ease_in : function()
    {
        // $(".tagline").transition({ opacity: 1, y : "0px" }, 500, 'in', function() {
        $(".tagline").fadeIn("fast", function() { 
            tagline_animation.init();
        });
    },
    update_text : function()
    {
        $(".tagline").html(this.get_new_tagline);
    },
    get_new_tagline : function() 
    {
        var index = lispsum.randomFromInterval(0, taglines.length);
        if (tagline_count%2 === 0) {
            tagline_count++;
            return taglines[index];
        } else {
            tagline_count++;
            return "A text-generator with a speech impediment."
        }
    }
}





var lispsum = 
{
    paragraphs: paragraphs,
    get_text : function () 
    {
        var quantity = $('.qty').val();
        var type = this.get_type();
        var text = this.generate_text(type, quantity);
        $('#text-output').html(text);
        $('.number-of-characters').html(this.get_char_count(text));
    },
    generate_text : function(type, quantity) {
        if (type === "Words") {
            return this.get_words(quantity);
        } else if (type === "Sentences") {
            return this.get_sentences(quantity);
        } else if (type === "Paragraphs") {
            return this.get_paragraphs(quantity);
        }
    },
    get_type : function()
    {
        return $('.selected').html();
    },
    get_paragraphs : function (number_of_paragraphs)
    {
        var text_output = "";
        for (var i = 0; i < number_of_paragraphs; i++) {
            text_output = text_output + this.paragraphs[i] + '\n\n';
        } 
        return text_output;
    },
    get_sentences : function (number_of_sentences) 
    {
        var current_paragraph = this.paragraphs[this.randomFromInterval(0,19)];
        var sentences = current_paragraph.split(". ");
        var text_output = "";
        for (var i = 0; i < number_of_sentences; i++) {
            text_output = text_output + sentences[i] + ". ";
        }
        return text_output;
    },
    get_words : function (number_of_words) 
    {
        var current_paragraph = this.paragraphs[this.randomFromInterval(0,19)];
        var words = current_paragraph.split(" ");
        var text_output = "";
        for (var i = 0; i < number_of_words; i++) {
            text_output = text_output + " " + words[i].replace(".","");
        }
        return text_output + ".";
    },
    randomFromInterval : function (from,to)
    {   
        return Math.floor(Math.random()*(to-from+1)+from);
    },
    get_char_count : function (text) {
        return text.length;
    }
}