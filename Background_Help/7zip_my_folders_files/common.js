if(typeof(SFX) == "undefined"){
  var SFX = {}; //load the SFX var if we don't already have one.
}

SFX.forums_controller = function(){
    var areSelected;
    var addEditAction;
    var targetUrl;

    return {
        'init': function(){
            var privateChecked = new Array();
            var anonymousChecked = new Array();
            var deleteChecked = new Array();

            SFX.forums_controller.areSelected = false;

            jQuery('a#toggle-forum-replies').toggle(function(e) {
                e.preventDefault();
                jQuery('#forum-replies').slideUp();
                jQuery(this).find('span').html('Show Replies');
            }, function(e) {
                e.preventDefault();
                jQuery('#forum-replies').slideDown();
                jQuery(this).find('span').html('Hide Replies');
            });

            jQuery('#forum-jump').change(function(e) {
                window.location = jQuery(this).find(':selected').val();
            });

            jQuery('form#per-page select').change(function(e) {
                var re1='(\\/)(projects)(\\/)((?:[a-z][a-z0-9_]*))(\\/)(forums)';
                var re2='((\\/)(forum)(\\/)(\\d+))?';
                var re3='((\\/)(topic)(\\/)(\\d+))?';

                var p = new RegExp(re1+re2+re3,["i"]);
                var m = p.exec(window.location.pathname);
                if (m) {
                    window.location = m[0] + "/per-page/perpage/" + jQuery("form#per-page select").val();
                }
            });

            jQuery('#create-reply').submit(function(e) {
                jQuery(this).find('input[type=submit]').attr('disabled', 'true').val('Adding Reply...');
            });

            //
            var titleText = 'Enter topic title';
            jQuery('#create-topic input[name=title]').val(titleText).focus(function(){
              if (jQuery(this).val() == titleText) {
                  jQuery(this).val('');
              }
            });

            jQuery('#create-topic').submit(function(e) {
                if(jQuery('#create-topic input[name=title]').val() == titleText) {
                    jQuery('#create-topic input[name=title]').val('');
                }
                jQuery(this).find('input[type=submit]').attr('disabled', 'true').val('Adding Topic...');
            });

            jQuery('#saveUpdatesTop').click(function(e) {return SFX.forums_controller.handle_save(e)});
            jQuery('#saveUpdatesBottom').click(function(e) {return SFX.forums_controller.handle_save(e)});

            jQuery('#deleteTopicTop').click(function(e) {return SFX.forums_controller.handle_topic_delete(e)});
            jQuery('#deleteTopicBottom').click(function(e) {return SFX.forums_controller.handle_topic_delete(e)});

            jQuery('#deleteMsgTop').click(function(e) {return SFX.forums_controller.handle_msg_delete(e)});
            jQuery('#deleteMsgBottom').click(function(e) {return SFX.forums_controller.handle_msg_delete(e)});

            jQuery('#selectAll').click(function(e) {
                e.preventDefault();
                if (!SFX.forums_controller.areSelected) {
                    jQuery(".message-delete .delete-checkbox").attr('checked', 'checked');
                    jQuery('#selectAll').html("Deselect All");
                    SFX.forums_controller.areSelected = true;
                } else {
                    jQuery(".message-delete .delete-checkbox").removeAttr('checked');
                    jQuery('#selectAll').html("Select All");
                    SFX.forums_controller.areSelected = false;
                }
            });

           jQuery("input[name='anonymous[]']:checkbox").change(function(e){

                var forumId = jQuery(this).val();

                var privateId = jQuery("input[name='private[]'][value='"+forumId+"']").val();
                var isChecked = jQuery("input[name='private[]'][value='"+forumId+"']").is(":checked");

                if (privateId === forumId && isChecked) {
                    jAlert("Anonymous postings cannot be made to a private forum", "Not Allowed");
                    jQuery(this).removeAttr('checked');
                }
            });

            jQuery('.editForum').click(function(e){
                e.preventDefault();
                SFX.forums_controller.editForumId = jQuery(this).attr("id");
                SFX.forums_controller.targetUrl = jQuery(this).attr("href");
                SFX.forums_controller.handle_edit(e)
            });

            jQuery('#addForum').click(function(e){
                e.preventDefault();
                SFX.forums_controller.targetUrl = jQuery(this).attr("href");
                SFX.forums_controller.handle_add(e)
            });

            if (jQuery("#addEditForum").length) {
                jQuery("#addEditForum").dialog({
                    autoOpen: false,
                    height: 360,
                    width: 600,
                    modal: true,
                    buttons: {
                        'Save': SFX.forums_controller.handle_save_edits,
                        Cancel: function() {
                                jQuery(this).dialog('close');
                        }
                    },
                    close: function() {
                        jQuery("#forum-name").val('').removeClass('ui-state-error');
                        jQuery("#send-all-posts-to").val('').removeClass('ui-state-error');
                        jQuery("#forum-desc").val('');
                        jQuery("input[value=public]:radio").attr('checked', 'checked');
                    }
                });
            }

            jQuery('.monitor-alert-login').click(function(e) {
                e.preventDefault();
                return jAlert("We\'ll send you email alerts when new topics are added or replies are posted to this forum. You need to be logged in to begin monitoring.<br /><br /><h2 class=\"ph-title\"><a href=\"/account/login.php\">Log in</a> or <a href=\"/account/registration/\">Create an Account</a></h2>", 'Log in to Monitor');
            });

            jQuery('a.topic-set-status').click(function(e) {
                e.preventDefault();
                var tag=jQuery(this);
                tag.attr('disabled','disabled');
                jQuery.ajax({url: tag.attr('href'), type: 'POST', data:{format:'json'},
                success: function(data) {
                    title = tag.closest('tr').find('h3');
                    if(tag.attr('href').slice(-1) == 0){
                        tag.find('span').html('Close topic');
                        tag.attr('href',tag.attr('href').slice(0,-1)+'1');
                        title.css('text-decoration','none');
                    }else{
                        tag.find('span').html('Open topic');
                        tag.attr('href',tag.attr('href').slice(0,-1)+'0');
                        title.css('text-decoration','line-through');
                    }
                },
                error: function(request, textStatus, errorThrown) {
                    tag.find('span').html("There was an error");
                },
                complete: function() {
                    tag.removeAttr('disabled');
                }});
            });

            jQuery('a.monitor-action').click(function(e) {
                e.preventDefault();
                var tag=jQuery(this);
                tag.fadeOut();
                jQuery.ajax({url: tag.attr('href'), data:{format:'json'},
                success: function(data) {
                    if(tag.attr('href').slice(-9) == 'unmonitor'){
                        tag.html('Monitor');
                        tag.attr('href',tag.attr('href').slice(0,-9)+'monitor');
                    }else{
                        tag.html('Unmonitor');
                        tag.attr('href',tag.attr('href').slice(0,-7)+'unmonitor');
                    }
                },
                error: function(request, textStatus, errorThrown) {
                    tag.html("There was an error");
                },
                complete: function() {
                    tag.fadeIn();
                }});
            });

            jQuery("input[name='private[]']").click(function(e) {
                var arrayIndex = jQuery(this).val();
                privateChecked[arrayIndex] = (privateChecked[arrayIndex] == 'changed') ? 'unchanged' : 'changed';
            });

            jQuery("input[name='anonymous[]']").click(function(e) {
                var arrayIndex = jQuery(this).val();
                anonymousChecked[arrayIndex] = (anonymousChecked[arrayIndex] == 'changed') ? 'unchanged' : 'changed';
            });

            jQuery("input[name='delete[]']").click(function(e) {
                var arrayIndex = jQuery(this).val();
                deleteChecked[arrayIndex] = (deleteChecked[arrayIndex] == 'changed') ? 'unchanged' : 'changed';
            });


            jQuery('div.paginationControl a').click(function(e) {
                var changed = false;
                for (var index in privateChecked) {
                    if (privateChecked[index] == 'changed') {
                        changed = true;
                        break;
                    }
                }
                if (!changed) {
                    for (var index in anonymousChecked) {
                        if (anonymousChecked[index] == 'changed') {
                            changed = true;
                            break;
                        }
                    }
                }
                if (!changed) {
                    for (var index in deleteChecked) {
                        if (deleteChecked[index] == 'changed') {
                            changed = true;
                            break;
                        }
                    }
                }
                if(changed) {
                    return confirm("Are you sure you want to navigate away from this page without saving your changes?");
                }
            });
        },

        'handle_save_edits' : function() {
            var bValid = true;
            jQuery("#forum-name").removeClass('ui-state-error');
            jQuery("#send-all-posts-to").removeClass('ui-state-error');
            bValid = bValid && SFX.forums_controller.checkLength(jQuery("#forum-name"),"forum-name", 3, 45);
            if (bValid) {
                var url = SFX.forums_controller.targetUrl;
                jQuery('#forum-loading-icon').show();
                jQuery.post(url, jQuery("#forum-add-edit-form").serialize(), function(data){
                    jQuery(this).dialog('close');
                    jQuery('#forum-loading-icon').hide();
                    location.reload();
                });
            }
        },

        'handle_topic_delete' : function(e) {
            return confirm("All messages in this topic will be deleted! Delete this Topic? Are you sure?");
        },

        'handle_msg_delete' : function(e) {
            return confirm("Delete this Message? Are you sure?");
        },

        'handle_edit' : function(e) {
            SFX.forums_controller.addEditAction = "edit-forum";
            var target_id = SFX.forums_controller.editForumId;
            var name = jQuery("#forumName-"+target_id).html();
            var desc = jQuery("#forumDesc-"+target_id).html();
            var email = jQuery("#forumEMail-"+target_id).html();


            jQuery("#forum-name").val(name);
            jQuery("#send-all-posts-to").val(email);
            jQuery("#forum-desc").val(desc);
            jQuery("#edit-forum-id").val(target_id);

            var isPrivate = jQuery("input[name='private[]'][value='"+target_id+"']").is(":checked");
            if (isPrivate) {
                jQuery("input[value=public]:radio").removeAttr('checked');
                jQuery("input[value=private]:radio").attr('checked', 'checked');
            } else {
                jQuery("input[value=private]:radio").removeAttr('checked');
                jQuery("input[value=public]:radio").attr('checked', 'checked');
            }

            jQuery("#addEditForum").dialog('option', 'title', 'Edit Forum');
            jQuery("#addEditForum").dialog('open');
        },

        'handle_add' : function(e) {
            SFX.forums_controller.addEditAction = "add-forum";

            jQuery("input[value=public]:radio").attr('checked', 'checked');

            jQuery("#addEditForum").dialog('option', 'title', 'Add New Forum');
            jQuery("#addEditForum").dialog('open');
        },

        'handle_save' : function(e) {
            return confirm("Saving updates. Are you sure?");
         },

        'checkLength' : function(o, n, min, max) {
            if (o.val().length > max || o.val().length < min) {
                o.addClass('ui-state-error');
                return false;
            } else {
                return true;
            }
        }


    };
}();

jQuery(function() {SFX.forums_controller.init();});
