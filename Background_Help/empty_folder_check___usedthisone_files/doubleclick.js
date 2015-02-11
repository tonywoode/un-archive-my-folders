var dcadmove_has_run = false;
jQuery(document).ready(function() {
    var source;
    var target;
    if (! dcadmove_has_run) {
        jQuery('.dcadmove').each(function(){
            source = this;
            target = jQuery('#' + source.id + '-target');
            if (target !== null) {
                target[0].innerHTML = source.innerHTML;
                // Do not remove source after copying to target.
                //  This tends to confuse Flash ads in IE.
            }
        });
        dcadmove_has_run = true;
    }
});