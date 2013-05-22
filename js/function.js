(function($){
	
$.fn.rollover = function(suffix) {
	var suffix = suffix || '_on';
	var check = new RegExp(suffix + '\\.\\w+$');
	return this.each(function() {
		var img = $(this);
		var src = img.attr('src');
		if (check.test(src)) return;
		var _on = src.replace(/\.\w+$/, suffix + '$&');
		$('<img>').attr('src', _on);
		img.hover(
			function() { img.attr('src', _on); },
			function() { img.attr('src', src); }
		);
	});
}

$.fn.bigLink = function() {
	this.on({'mouseenter':function(){
		$(this).addClass('active');
	},'mouseleave':function(){
		$(this).removeClass('active');
	}}).on('click',this,function(){
		window.location.href = $(this).find("a").attr("href");
		return false;
	});
}

$.fn.wink = function(a) {
	var opacity = a || 0.2;
	$(document).on('mouseenter',this,function(){
		$(this).fadeTo(0,opacity).fadeTo('slow',1);
	});
}

$.fn.smoothScroll = function(options){
	var c = $.extend({
		speed : 1000,
		easing : 'swing'
	}, options);	
	this.on('click',function(e){
		e.preventDefault();
		var $elmHash = this.hash;
		if(!$elmHash || $elmHash === "#") {
			return false;
		};
		var targetOffset = $($elmHash).offset().top;
		$('html,body').animate({scrollTop: targetOffset}, c.speed, c.easing);
	});
}

$('img.over').rollover();
$('a[href^=#]').not('.noscroll').smoothScroll();
$('.information tr:not(.nolink)').bigLink();

$.getJSON("http://twitter.com/statuses/user_timeline/SapporoCSS.json?callback=?", function(data) {
	var listUlElm = $("#twitterFeed"),
		twiUrl = 'http://twitter.com/';
	listUlElm.find('li').remove();
	$.each(data , function(i , data) {
		var txt = data.text;
		txt = txt.replace(/(http:\/\/[\x21-\x7e]+)/gi,'<a href="$1">$1</a>')
			.replace(/#(\w+)/g,'<a href="'+twiUrl+'#search?q=%23$1">#$1</a>')
			.replace(/\@(\w+)/g,'<a href="'+twiUrl+'$1">@$1</a>'); 
	
		listUlElm.append(
			$('<li/>').html(txt)
		);
		if ( i == 4 ) return false;
	});
});



})(jQuery);

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/ja_JP/all.js#xfbml=1&appId=158588230886897";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));