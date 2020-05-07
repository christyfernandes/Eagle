/*               "Copyright 2020 Infosys Ltd.
               Use of this source code is governed by GPL v3 license that can be found in the LICENSE file or at https://opensource.org/licenses/GPL-3.0
               This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License version 3"*/
(window.webpackJsonp=window.webpackJsonp||[]).push([[72],{"/+rX":function(n,e,l){"use strict";l.r(e);var t=l("CcnG"),o=function(){return function(){}}(),i=l("pMnS"),a=l("bujt"),u=l("ZYCi"),r=l("Ip0R"),d=l("UodH"),s=l("dWZg"),c=l("lLAP"),p=l("wFw1"),m=l("Mr+X"),v=l("SMsm"),f=l("MlvX"),h=l("Wf4p"),b=l("HeqF"),g=l("C39E"),I=l("/dO6"),y=l("lzlj"),w=l("FVSy"),S=l("tRTW"),_=l("seP3"),R=l("Fzqc"),k=l("gIcY"),C=l("COnx"),q=l("FbN9"),x=l("8mMr"),F=l("dJrM"),E=l("4tE/"),D=l("eDkP"),O=l("qAlS"),T=l("b716"),A=l("/VYK"),L=l("Rn7m"),j=l("p0Sj"),M=l("67Y/"),V=l("5DKC"),U=l("t/Na"),N={userTopics:V.b+"/user/topic",recommendedTopics:V.c+"/topic/recommend"},K=function(){function n(n){this.http=n}return n.prototype.fetchSuggestedTopics=function(){return this.http.get(""+N.recommendedTopics).pipe(Object(M.a)(function(n){return n.result.response.topics.map(function(n){return n["concepts.name"]})}))},n.prototype.fetchUserTopics=function(){return this.http.get(N.userTopics+"?ts="+(new Date).getTime()).pipe(Object(M.a)(function(n){return n.result.response.topics.map(function(n){return n.name})}))},n.prototype.modifyUserTopics=function(n){return this.http.post(N.userTopics,{topics:n})},n.ngInjectableDef=t["\u0275\u0275defineInjectable"]({factory:function(){return new n(t["\u0275\u0275inject"](U.c))},token:n,providedIn:"root"}),n}(),P=l("v+9p"),Z=l("A1CT"),B=function(){function n(n,e,l){this.interestApi=n,this.catalogSvc=e,this.utilitySvc=l}return n.prototype.fetchUserInterests=function(){return this.interestApi.fetchUserTopics()},n.prototype.fetchSuggestedInterests=function(){return this.interestApi.fetchSuggestedTopics()},n.prototype.modifyUserInterests=function(n){return this.interestApi.modifyUserTopics(n)},n.prototype.fetchAutocompleteInterests=function(){var n=this;return this.catalogSvc.fetchCatalog().pipe(Object(M.a)(function(e){return n.utilitySvc.getLeafNodes(e,[]).map(function(n){return n.value})||[]}))},n.ngInjectableDef=t["\u0275\u0275defineInjectable"]({factory:function(){return new n(t["\u0275\u0275inject"](K),t["\u0275\u0275inject"](P.a),t["\u0275\u0275inject"](Z.a))},token:n,providedIn:"root"}),n}(),z=l("sFxA"),Y=l("VX4o"),$=function(){function n(n,e,l,t,o){this.route=n,this.routingSvc=e,this.interestSvc=l,this.telemetrySvc=t,this.snackBar=o,this.userInterestsResponse=this.route.snapshot.data.interestUser,this.userInterests=[],this.suggestedInterests=[],this.suggestionsLimit=15,this.requestStatus=!1,this.userInterestsFetchError=!1,this.autocompleteInterests=[],this.interestControl=new k.f(""),this.userInterestsResponse.error?this.userInterestsFetchError=!0:this.userInterests=this.userInterestsResponse.data}return n.prototype.ngOnInit=function(){var n=this;this.displayMode=this.route.snapshot.queryParamMap.get("mode"),this.fetchSuggestedInterests(),this.interestControl.setValue(""),this.interestSvc.fetchAutocompleteInterests().subscribe(function(e){n.autocompleteInterests=Array.from(new Set(e)).sort(),n.filteredOptions$=n.interestControl.valueChanges.pipe(Object(j.a)(""),Object(M.a)(function(n){return n.toLowerCase()}),Object(M.a)(function(e){return n.autocompleteInterests.map(function(n){var l=n.toLowerCase(),t=0;return l===e?t=100:l.startsWith(e)?t=50:l.includes(e)&&(t=10),{interest:n,score:t}}).filter(function(n){return n.score>0}).sort(function(n,e){return e.score-n.score}).map(function(n){return n.interest})}))})},n.prototype.fetchSuggestedInterests=function(){var n=this;this.interestSvc.fetchSuggestedInterests().subscribe(function(e){n.suggestedInterests=e,n.removeAlreadyAddedFromRecommended()})},n.prototype.removeAlreadyAddedFromRecommended=function(){if(this.userInterests.length&&this.suggestedInterests.length){var n=new Set(this.userInterests);this.suggestedInterests=this.suggestedInterests.filter(function(e){return!Boolean(n.has(e))})}},n.prototype.optionSelected=function(n){this.interestControl.setValue(""),this.interestSearch.nativeElement.blur(),this.addInterest(n)},n.prototype.addInterest=function(n,e){var l=this;void 0===e&&(e=!1),(n=n.trim()).length&&(this.userInterests.filter(function(e){return e.toLowerCase()===n.toLowerCase()}).length?this.openSnackBar(this.toastDuplicate.nativeElement.value):(this.requestStatus=!0,this.interestSvc.modifyUserInterests([n].concat(this.userInterests)).subscribe(function(t){e&&(l.suggestedInterests=l.suggestedInterests.filter(function(e){return e!==n})),l.userInterests.splice(0,0,n),l.requestStatus=!1,l.openSnackBar(l.toastSuccess.nativeElement.value),l.telemetrySvc.interestTelemetryEvent(l.userInterests)},function(n){l.requestStatus=!1,l.openSnackBar(l.toastFailure.nativeElement.value)})))},n.prototype.removeInterest=function(n){var e=this,l=this.userInterests.indexOf(n);this.userInterests.splice(l,1),this.interestSvc.modifyUserInterests(this.userInterests).subscribe(function(n){e.fetchSuggestedInterests(),e.openSnackBar(e.toastSuccess.nativeElement.value)},function(t){e.userInterests.splice(l,0,n),e.openSnackBar(e.toastFailure.nativeElement.value)})},n.prototype.openSnackBar=function(n,e){void 0===e&&(e=4e3),this.snackBar.open(n,void 0,{duration:e})},n}(),W=l("vARd"),G=t["\u0275crt"]({encapsulation:0,styles:[[".interest-holder[_ngcontent-%COMP%]{width:90%;display:block;margin:auto}mat-card[_ngcontent-%COMP%]{margin-bottom:12px}"]],data:{}});function X(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,5,"a",[["mat-icon-button",""]],[[1,"target",0],[8,"href",4],[1,"tabindex",0],[1,"disabled",0],[1,"aria-disabled",0],[2,"_mat-animation-noopable",null]],[[null,"click"]],function(n,e,l){var o=!0;return"click"===e&&(o=!1!==t["\u0275nov"](n,1).onClick(l.button,l.ctrlKey,l.metaKey,l.shiftKey)&&o),"click"===e&&(o=!1!==t["\u0275nov"](n,2)._haltDisabledEvents(l)&&o),o},a.c,a.a)),t["\u0275did"](1,671744,null,0,u.r,[u.o,u.a,r.l],{queryParams:[0,"queryParams"],fragment:[1,"fragment"],routerLink:[2,"routerLink"]},null),t["\u0275did"](2,180224,null,0,d.a,[s.a,c.h,t.ElementRef,[2,p.a]],null,null),(n()(),t["\u0275eld"](3,0,null,0,2,"mat-icon",[["class","mat-icon notranslate"],["role","img"]],[[2,"mat-icon-inline",null],[2,"mat-icon-no-color",null]],null,null,m.b,m.a)),t["\u0275did"](4,9158656,null,0,v.b,[t.ElementRef,v.d,[8,null],[2,v.a]],null,null),(n()(),t["\u0275ted"](-1,0,["arrow_back"]))],function(n,e){var l=e.component;n(e,1,0,l.routingSvc.getLastUrl().qparams,l.routingSvc.getLastUrl().fragment,l.routingSvc.getLastUrl().route),n(e,4,0)},function(n,e){n(e,0,0,t["\u0275nov"](e,1).target,t["\u0275nov"](e,1).href,t["\u0275nov"](e,2).disabled?-1:t["\u0275nov"](e,2).tabIndex||0,t["\u0275nov"](e,2).disabled||null,t["\u0275nov"](e,2).disabled.toString(),"NoopAnimations"===t["\u0275nov"](e,2)._animationMode),n(e,3,0,t["\u0275nov"](e,4).inline,"primary"!==t["\u0275nov"](e,4).color&&"accent"!==t["\u0275nov"](e,4).color&&"warn"!==t["\u0275nov"](e,4).color)})}function H(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,3,"a",[["aria-label","Interessen hinzuf\xfcgen erledigt"],["mat-raised-button",""]],[[1,"target",0],[8,"href",4],[1,"tabindex",0],[1,"disabled",0],[1,"aria-disabled",0],[2,"_mat-animation-noopable",null]],[[null,"click"]],function(n,e,l){var o=!0;return"click"===e&&(o=!1!==t["\u0275nov"](n,1).onClick(l.button,l.ctrlKey,l.metaKey,l.shiftKey)&&o),"click"===e&&(o=!1!==t["\u0275nov"](n,2)._haltDisabledEvents(l)&&o),o},a.c,a.a)),t["\u0275did"](1,671744,null,0,u.r,[u.o,u.a,r.l],{routerLink:[0,"routerLink"]},null),t["\u0275did"](2,180224,null,0,d.a,[s.a,c.h,t.ElementRef,[2,p.a]],null,null),(n()(),t["\u0275ted"](-1,0,["Fertig"]))],function(n,e){n(e,1,0,"/home")},function(n,e){n(e,0,0,t["\u0275nov"](e,1).target,t["\u0275nov"](e,1).href,t["\u0275nov"](e,2).disabled?-1:t["\u0275nov"](e,2).tabIndex||0,t["\u0275nov"](e,2).disabled||null,t["\u0275nov"](e,2).disabled.toString(),"NoopAnimations"===t["\u0275nov"](e,2)._animationMode)})}function J(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,2,"mat-option",[["class","mat-option"],["role","option"]],[[1,"tabindex",0],[2,"mat-selected",null],[2,"mat-option-multiple",null],[2,"mat-active",null],[8,"id",0],[1,"aria-selected",0],[1,"aria-disabled",0],[2,"mat-option-disabled",null]],[[null,"click"],[null,"keydown"]],function(n,e,l){var o=!0;return"click"===e&&(o=!1!==t["\u0275nov"](n,1)._selectViaInteraction()&&o),"keydown"===e&&(o=!1!==t["\u0275nov"](n,1)._handleKeydown(l)&&o),o},f.c,f.a)),t["\u0275did"](1,8568832,[[13,4]],0,h.s,[t.ElementRef,t.ChangeDetectorRef,[2,h.l],[2,h.r]],{value:[0,"value"]},null),(n()(),t["\u0275ted"](2,0,["",""]))],function(n,e){n(e,1,0,t["\u0275nov"](e.parent,28).value)},function(n,e){n(e,0,0,t["\u0275nov"](e,1)._getTabIndex(),t["\u0275nov"](e,1).selected,t["\u0275nov"](e,1).multiple,t["\u0275nov"](e,1).active,t["\u0275nov"](e,1).id,t["\u0275nov"](e,1)._getAriaSelected(),t["\u0275nov"](e,1).disabled.toString(),t["\u0275nov"](e,1).disabled),n(e,2,0,t["\u0275nov"](e.parent,28).value)})}function Q(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,2,"mat-option",[["class","mat-option"],["role","option"]],[[1,"tabindex",0],[2,"mat-selected",null],[2,"mat-option-multiple",null],[2,"mat-active",null],[8,"id",0],[1,"aria-selected",0],[1,"aria-disabled",0],[2,"mat-option-disabled",null]],[[null,"click"],[null,"keydown"]],function(n,e,l){var o=!0;return"click"===e&&(o=!1!==t["\u0275nov"](n,1)._selectViaInteraction()&&o),"keydown"===e&&(o=!1!==t["\u0275nov"](n,1)._handleKeydown(l)&&o),o},f.c,f.a)),t["\u0275did"](1,8568832,[[13,4]],0,h.s,[t.ElementRef,t.ChangeDetectorRef,[2,h.l],[2,h.r]],{value:[0,"value"]},null),(n()(),t["\u0275ted"](2,0,["",""]))],function(n,e){n(e,1,0,e.context.$implicit)},function(n,e){n(e,0,0,t["\u0275nov"](e,1)._getTabIndex(),t["\u0275nov"](e,1).selected,t["\u0275nov"](e,1).multiple,t["\u0275nov"](e,1).active,t["\u0275nov"](e,1).id,t["\u0275nov"](e,1)._getAriaSelected(),t["\u0275nov"](e,1).disabled.toString(),t["\u0275nov"](e,1).disabled),n(e,2,0,e.context.$implicit)})}function nn(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"app-spinner",[],null,null,null,b.b,b.a)),t["\u0275did"](1,49152,null,0,g.a,[],null,null)],null,null)}function en(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"h4",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["Interessen k\xf6nnen nicht abgerufen werden"]))],null,null)}function ln(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"h4",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["Keine Interessen"]))],null,null)}function tn(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,9,"mat-chip",[["class","mat-chip"],["role","option"]],[[1,"tabindex",0],[2,"mat-chip-selected",null],[2,"mat-chip-with-avatar",null],[2,"mat-chip-with-trailing-icon",null],[2,"mat-chip-disabled",null],[1,"disabled",0],[1,"aria-disabled",0],[1,"aria-selected",0]],[[null,"removed"],[null,"click"],[null,"keydown"],[null,"focus"],[null,"blur"]],function(n,e,l){var o=!0,i=n.component;return"click"===e&&(o=!1!==t["\u0275nov"](n,1)._handleClick(l)&&o),"keydown"===e&&(o=!1!==t["\u0275nov"](n,1)._handleKeydown(l)&&o),"focus"===e&&(o=!1!==t["\u0275nov"](n,1).focus()&&o),"blur"===e&&(o=!1!==t["\u0275nov"](n,1)._blur()&&o),"removed"===e&&(o=!1!==i.removeInterest(n.context.$implicit)&&o),o},null,null)),t["\u0275did"](1,147456,[[15,4]],3,I.b,[t.ElementRef,t.NgZone,s.a,[2,h.m]],{removable:[0,"removable"]},{removed:"removed"}),t["\u0275qud"](335544320,16,{avatar:0}),t["\u0275qud"](335544320,17,{trailingIcon:0}),t["\u0275qud"](335544320,18,{removeIcon:0}),(n()(),t["\u0275ted"](5,null,[" "," "])),(n()(),t["\u0275eld"](6,0,null,null,3,"mat-icon",[["class","mat-icon notranslate mat-chip-remove mat-chip-trailing-icon"],["matChipRemove",""],["role","img"]],[[2,"mat-icon-inline",null],[2,"mat-icon-no-color",null]],[[null,"click"]],function(n,e,l){var o=!0;return"click"===e&&(o=!1!==t["\u0275nov"](n,8)._handleClick(l)&&o),o},m.b,m.a)),t["\u0275did"](7,9158656,null,0,v.b,[t.ElementRef,v.d,[8,null],[2,v.a]],null,null),t["\u0275did"](8,16384,[[18,4]],0,I.e,[I.b],null,null),(n()(),t["\u0275ted"](-1,0,["cancel"]))],function(n,e){n(e,1,0,!0),n(e,7,0)},function(n,e){n(e,0,0,t["\u0275nov"](e,1).disabled?null:-1,t["\u0275nov"](e,1).selected,t["\u0275nov"](e,1).avatar,t["\u0275nov"](e,1).trailingIcon||t["\u0275nov"](e,1).removeIcon,t["\u0275nov"](e,1).disabled,t["\u0275nov"](e,1).disabled||null,t["\u0275nov"](e,1).disabled.toString(),t["\u0275nov"](e,1).ariaSelected),n(e,5,0,e.context.$implicit),n(e,6,0,t["\u0275nov"](e,7).inline,"primary"!==t["\u0275nov"](e,7).color&&"accent"!==t["\u0275nov"](e,7).color&&"warn"!==t["\u0275nov"](e,7).color)})}function on(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,9,"mat-chip",[["class","mat-chip"],["role","option"]],[[1,"tabindex",0],[2,"mat-chip-selected",null],[2,"mat-chip-with-avatar",null],[2,"mat-chip-with-trailing-icon",null],[2,"mat-chip-disabled",null],[1,"disabled",0],[1,"aria-disabled",0],[1,"aria-selected",0]],[[null,"removed"],[null,"click"],[null,"keydown"],[null,"focus"],[null,"blur"]],function(n,e,l){var o=!0,i=n.component;return"click"===e&&(o=!1!==t["\u0275nov"](n,1)._handleClick(l)&&o),"keydown"===e&&(o=!1!==t["\u0275nov"](n,1)._handleKeydown(l)&&o),"focus"===e&&(o=!1!==t["\u0275nov"](n,1).focus()&&o),"blur"===e&&(o=!1!==t["\u0275nov"](n,1)._blur()&&o),"removed"===e&&(o=!1!==i.addInterest(n.context.$implicit,!0)&&o),o},null,null)),t["\u0275did"](1,147456,[[19,4]],3,I.b,[t.ElementRef,t.NgZone,s.a,[2,h.m]],{removable:[0,"removable"]},{removed:"removed"}),t["\u0275qud"](335544320,20,{avatar:0}),t["\u0275qud"](335544320,21,{trailingIcon:0}),t["\u0275qud"](335544320,22,{removeIcon:0}),(n()(),t["\u0275ted"](5,null,[" "," "])),(n()(),t["\u0275eld"](6,0,null,null,3,"mat-icon",[["class","mat-icon notranslate mat-chip-remove mat-chip-trailing-icon"],["matChipRemove",""],["role","img"]],[[2,"mat-icon-inline",null],[2,"mat-icon-no-color",null]],[[null,"click"]],function(n,e,l){var o=!0;return"click"===e&&(o=!1!==t["\u0275nov"](n,8)._handleClick(l)&&o),o},m.b,m.a)),t["\u0275did"](7,9158656,null,0,v.b,[t.ElementRef,v.d,[8,null],[2,v.a]],null,null),t["\u0275did"](8,16384,[[22,4]],0,I.e,[I.b],null,null),(n()(),t["\u0275ted"](-1,0,["add_circle"]))],function(n,e){n(e,1,0,!0),n(e,7,0)},function(n,e){n(e,0,0,t["\u0275nov"](e,1).disabled?null:-1,t["\u0275nov"](e,1).selected,t["\u0275nov"](e,1).avatar,t["\u0275nov"](e,1).trailingIcon||t["\u0275nov"](e,1).removeIcon,t["\u0275nov"](e,1).disabled,t["\u0275nov"](e,1).disabled||null,t["\u0275nov"](e,1).disabled.toString(),t["\u0275nov"](e,1).ariaSelected),n(e,5,0,e.context.$implicit),n(e,6,0,t["\u0275nov"](e,7).inline,"primary"!==t["\u0275nov"](e,7).color&&"accent"!==t["\u0275nov"](e,7).color&&"warn"!==t["\u0275nov"](e,7).color)})}function an(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,17,"mat-card",[["class","mat-card"]],null,null,null,y.d,y.a)),t["\u0275did"](1,49152,null,0,w.a,[],null,null),(n()(),t["\u0275eld"](2,0,null,0,15,"mat-card-content",[["class","mat-card-content"]],null,null,null,null,null)),t["\u0275did"](3,16384,null,0,w.c,[],null,null),(n()(),t["\u0275eld"](4,0,null,null,13,"div",[["class","interest-holder"]],null,null,null,null,null)),(n()(),t["\u0275eld"](5,0,null,null,1,"h2",[["class","mat-h2"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["Unsere Empfehlungen"])),(n()(),t["\u0275eld"](7,0,null,null,6,"mat-chip-list",[["class","mat-chip-list"]],[[1,"tabindex",0],[1,"aria-describedby",0],[1,"aria-required",0],[1,"aria-disabled",0],[1,"aria-invalid",0],[1,"aria-multiselectable",0],[1,"role",0],[2,"mat-chip-list-disabled",null],[2,"mat-chip-list-invalid",null],[2,"mat-chip-list-required",null],[1,"aria-orientation",0],[8,"id",0]],[[null,"focus"],[null,"blur"],[null,"keydown"]],function(n,e,l){var o=!0;return"focus"===e&&(o=!1!==t["\u0275nov"](n,9).focus()&&o),"blur"===e&&(o=!1!==t["\u0275nov"](n,9)._blur()&&o),"keydown"===e&&(o=!1!==t["\u0275nov"](n,9)._keydown(l)&&o),o},S.b,S.a)),t["\u0275prd"](6144,null,_.d,null,[I.d]),t["\u0275did"](9,1556480,null,1,I.d,[t.ElementRef,t.ChangeDetectorRef,[2,R.b],[2,k.s],[2,k.j],h.d,[8,null]],null,null),t["\u0275qud"](603979776,19,{chips:1}),(n()(),t["\u0275and"](16777216,null,0,2,null,on)),t["\u0275did"](12,278528,null,0,r.n,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),t["\u0275ppd"](13,2),(n()(),t["\u0275eld"](14,0,null,null,3,"div",[["class","text-right"]],[[8,"hidden",0]],null,null,null,null)),(n()(),t["\u0275eld"](15,0,null,null,2,"button",[["accesskey","+"],["aria-label","Weitere Interessen ansehen"],["mat-button",""],["type","button"]],[[8,"disabled",0],[2,"_mat-animation-noopable",null]],[[null,"click"]],function(n,e,l){var t=!0,o=n.component;return"click"===e&&(t=!1!==(o.suggestionsLimit=o.suggestedInterests.length)&&t),t},a.d,a.b)),t["\u0275did"](16,180224,null,0,d.b,[t.ElementRef,s.a,c.h,[2,p.a]],null,null),(n()(),t["\u0275ted"](-1,0,["Mehr ansehen"]))],function(n,e){var l=e.component;n(e,9,0);var o=t["\u0275unv"](e,12,0,n(e,13,0,t["\u0275nov"](e.parent,0),l.suggestedInterests,l.suggestionsLimit));n(e,12,0,o)},function(n,e){var l=e.component;n(e,7,1,[t["\u0275nov"](e,9).disabled?null:t["\u0275nov"](e,9)._tabIndex,t["\u0275nov"](e,9)._ariaDescribedby||null,t["\u0275nov"](e,9).required.toString(),t["\u0275nov"](e,9).disabled.toString(),t["\u0275nov"](e,9).errorState,t["\u0275nov"](e,9).multiple,t["\u0275nov"](e,9).role,t["\u0275nov"](e,9).disabled,t["\u0275nov"](e,9).errorState,t["\u0275nov"](e,9).required,t["\u0275nov"](e,9).ariaOrientation,t["\u0275nov"](e,9)._uid]),n(e,14,0,l.suggestionsLimit>=l.suggestedInterests.length),n(e,15,0,t["\u0275nov"](e,16).disabled||null,"NoopAnimations"===t["\u0275nov"](e,16)._animationMode)})}function un(n){return t["\u0275vid"](0,[t["\u0275pid"](0,C.a,[]),t["\u0275qud"](402653184,1,{toastSuccess:0}),t["\u0275qud"](402653184,2,{toastDuplicate:0}),t["\u0275qud"](402653184,3,{toastFailure:0}),t["\u0275qud"](402653184,4,{interestSearch:0}),(n()(),t["\u0275eld"](5,0,null,null,9,"mat-toolbar",[["class","mat-toolbar"],["color","primary"]],[[2,"mat-toolbar-multiple-rows",null],[2,"mat-toolbar-single-row",null]],null,null,q.b,q.a)),t["\u0275did"](6,4243456,null,1,x.a,[t.ElementRef,s.a,r.d],{color:[0,"color"]},null),t["\u0275qud"](603979776,5,{_toolbarRows:1}),(n()(),t["\u0275and"](16777216,null,0,1,null,X)),t["\u0275did"](9,16384,null,0,r.o,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275eld"](10,0,null,0,1,"span",[["class","margin-left-xs"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["Interessen"])),(n()(),t["\u0275eld"](12,0,null,0,0,"span",[["class","spacer"]],null,null,null,null,null)),(n()(),t["\u0275and"](16777216,null,0,1,null,H)),t["\u0275did"](14,16384,null,0,r.o,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275eld"](15,0,null,null,35,"mat-card",[["class","mat-card"]],null,null,null,y.d,y.a)),t["\u0275did"](16,49152,null,0,w.a,[],null,null),(n()(),t["\u0275eld"](17,0,null,0,33,"mat-card-content",[["class","mat-card-content"]],null,null,null,null,null)),t["\u0275did"](18,16384,null,0,w.c,[],null,null),(n()(),t["\u0275eld"](19,0,null,null,21,"mat-form-field",[["class","interest-holder mat-form-field"],["color","primary"]],[[2,"mat-form-field-appearance-standard",null],[2,"mat-form-field-appearance-fill",null],[2,"mat-form-field-appearance-outline",null],[2,"mat-form-field-appearance-legacy",null],[2,"mat-form-field-invalid",null],[2,"mat-form-field-can-float",null],[2,"mat-form-field-should-float",null],[2,"mat-form-field-has-label",null],[2,"mat-form-field-hide-placeholder",null],[2,"mat-form-field-disabled",null],[2,"mat-form-field-autofilled",null],[2,"mat-focused",null],[2,"mat-accent",null],[2,"mat-warn",null],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null],[2,"_mat-animation-noopable",null]],null,null,F.b,F.a)),t["\u0275did"](20,7520256,null,7,_.c,[t.ElementRef,t.ChangeDetectorRef,[2,h.j],[2,R.b],[2,_.a],s.a,t.NgZone,[2,p.a]],{color:[0,"color"]},null),t["\u0275qud"](335544320,6,{_control:0}),t["\u0275qud"](335544320,7,{_placeholderChild:0}),t["\u0275qud"](335544320,8,{_labelChild:0}),t["\u0275qud"](603979776,9,{_errorChildren:1}),t["\u0275qud"](603979776,10,{_hintChildren:1}),t["\u0275qud"](603979776,11,{_prefixChildren:1}),t["\u0275qud"](603979776,12,{_suffixChildren:1}),(n()(),t["\u0275eld"](28,16777216,[[4,0],["interestSearch",1]],1,8,"input",[["accesskey","F"],["aria-label","Themen suchen"],["class","mat-input-element mat-form-field-autofill-control"],["matInput",""],["placeholder","Suchthemen"],["type","text"]],[[1,"autocomplete",0],[1,"role",0],[1,"aria-autocomplete",0],[1,"aria-activedescendant",0],[1,"aria-expanded",0],[1,"aria-owns",0],[1,"aria-haspopup",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null],[2,"mat-input-server",null],[1,"id",0],[1,"placeholder",0],[8,"disabled",0],[8,"required",0],[1,"readonly",0],[1,"aria-describedby",0],[1,"aria-invalid",0],[1,"aria-required",0]],[[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"],[null,"focusin"],[null,"keydown"],[null,"focus"]],function(n,e,l){var o=!0;return"input"===e&&(o=!1!==t["\u0275nov"](n,29)._handleInput(l.target.value)&&o),"blur"===e&&(o=!1!==t["\u0275nov"](n,29).onTouched()&&o),"compositionstart"===e&&(o=!1!==t["\u0275nov"](n,29)._compositionStart()&&o),"compositionend"===e&&(o=!1!==t["\u0275nov"](n,29)._compositionEnd(l.target.value)&&o),"focusin"===e&&(o=!1!==t["\u0275nov"](n,30)._handleFocus()&&o),"blur"===e&&(o=!1!==t["\u0275nov"](n,30)._onTouched()&&o),"input"===e&&(o=!1!==t["\u0275nov"](n,30)._handleInput(l)&&o),"keydown"===e&&(o=!1!==t["\u0275nov"](n,30)._handleKeydown(l)&&o),"blur"===e&&(o=!1!==t["\u0275nov"](n,35)._focusChanged(!1)&&o),"focus"===e&&(o=!1!==t["\u0275nov"](n,35)._focusChanged(!0)&&o),"input"===e&&(o=!1!==t["\u0275nov"](n,35)._onInput()&&o),o},null,null)),t["\u0275did"](29,16384,null,0,k.d,[t.Renderer2,t.ElementRef,[2,k.a]],null,null),t["\u0275did"](30,147456,null,0,E.f,[t.ElementRef,D.c,t.ViewContainerRef,t.NgZone,t.ChangeDetectorRef,E.b,[2,R.b],[2,_.c],[2,r.d],O.e],{autocomplete:[0,"autocomplete"]},null),t["\u0275prd"](1024,null,k.o,function(n,e){return[n,e]},[k.d,E.f]),t["\u0275did"](32,540672,null,0,k.g,[[8,null],[8,null],[6,k.o],[2,k.B]],{form:[0,"form"]},null),t["\u0275prd"](2048,null,k.p,null,[k.g]),t["\u0275did"](34,16384,null,0,k.q,[[4,k.p]],null,null),t["\u0275did"](35,999424,null,0,T.b,[t.ElementRef,s.a,[6,k.p],[2,k.s],[2,k.j],h.d,[8,null],A.a,t.NgZone],{placeholder:[0,"placeholder"],type:[1,"type"]},null),t["\u0275prd"](2048,[[6,4]],_.d,null,[T.b]),(n()(),t["\u0275eld"](37,0,null,4,3,"mat-icon",[["class","mat-icon notranslate"],["matSuffix",""],["role","img"]],[[2,"mat-icon-inline",null],[2,"mat-icon-no-color",null]],null,null,m.b,m.a)),t["\u0275did"](38,9158656,null,0,v.b,[t.ElementRef,v.d,[8,null],[2,v.a]],null,null),t["\u0275did"](39,16384,[[12,4]],0,_.h,[],null,null),(n()(),t["\u0275ted"](-1,0,["search"])),(n()(),t["\u0275eld"](41,0,null,null,9,"mat-autocomplete",[["autoActiveFirstOption",""],["class","mat-autocomplete"]],null,[[null,"optionSelected"]],function(n,e,l){var t=!0;return"optionSelected"===e&&(t=!1!==n.component.optionSelected(l.option.value)&&t),t},L.b,L.a)),t["\u0275prd"](6144,null,h.l,null,[E.d]),t["\u0275did"](43,1097728,[["auto",4]],2,E.d,[t.ChangeDetectorRef,t.ElementRef,E.a],{autoActiveFirstOption:[0,"autoActiveFirstOption"]},{optionSelected:"optionSelected"}),t["\u0275qud"](603979776,13,{options:1}),t["\u0275qud"](603979776,14,{optionGroups:1}),(n()(),t["\u0275and"](16777216,null,0,1,null,J)),t["\u0275did"](47,16384,null,0,r.o,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,0,2,null,Q)),t["\u0275did"](49,278528,null,0,r.n,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),t["\u0275pid"](131072,r.b,[t.ChangeDetectorRef]),(n()(),t["\u0275eld"](51,0,null,null,18,"mat-card",[["class","mat-card"]],null,null,null,y.d,y.a)),t["\u0275did"](52,49152,null,0,w.a,[],null,null),(n()(),t["\u0275eld"](53,0,null,0,16,"mat-card-content",[["class","mat-card-content"]],null,null,null,null,null)),t["\u0275did"](54,16384,null,0,w.c,[],null,null),(n()(),t["\u0275eld"](55,0,null,null,14,"div",[["class","interest-holder"]],null,null,null,null,null)),(n()(),t["\u0275eld"](56,0,null,null,1,"h2",[["class","mat-h2"]],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["Meine Interessen"])),(n()(),t["\u0275and"](16777216,null,null,1,null,nn)),t["\u0275did"](59,16384,null,0,r.o,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,en)),t["\u0275did"](61,16384,null,0,r.o,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,ln)),t["\u0275did"](63,16384,null,0,r.o,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275eld"](64,0,null,null,5,"mat-chip-list",[["class","mat-chip-list"]],[[1,"tabindex",0],[1,"aria-describedby",0],[1,"aria-required",0],[1,"aria-disabled",0],[1,"aria-invalid",0],[1,"aria-multiselectable",0],[1,"role",0],[2,"mat-chip-list-disabled",null],[2,"mat-chip-list-invalid",null],[2,"mat-chip-list-required",null],[1,"aria-orientation",0],[8,"id",0]],[[null,"focus"],[null,"blur"],[null,"keydown"]],function(n,e,l){var o=!0;return"focus"===e&&(o=!1!==t["\u0275nov"](n,66).focus()&&o),"blur"===e&&(o=!1!==t["\u0275nov"](n,66)._blur()&&o),"keydown"===e&&(o=!1!==t["\u0275nov"](n,66)._keydown(l)&&o),o},S.b,S.a)),t["\u0275prd"](6144,null,_.d,null,[I.d]),t["\u0275did"](66,1556480,null,1,I.d,[t.ElementRef,t.ChangeDetectorRef,[2,R.b],[2,k.s],[2,k.j],h.d,[8,null]],null,null),t["\u0275qud"](603979776,15,{chips:1}),(n()(),t["\u0275and"](16777216,null,0,1,null,tn)),t["\u0275did"](69,278528,null,0,r.n,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,an)),t["\u0275did"](71,16384,null,0,r.o,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275eld"](72,0,[[1,0],["toastSuccess",1]],null,0,"input",[["aria-value","Interests add successful"],["i18-aria-value",""],["i18-value",""],["type","hidden"],["value","Preferences saved"]],null,null,null,null,null)),(n()(),t["\u0275eld"](73,0,[[2,0],["toastDuplicate",1]],null,0,"input",[["aria-value","Duplicate interest in user list"],["i18-aria-value",""],["i18-value",""],["type","hidden"],["value","Interest already present"]],null,null,null,null,null)),(n()(),t["\u0275eld"](74,0,[[3,0],["toastFailure",1]],null,0,"input",[["aria-value","Unable to save interests"],["i18-aria-value",""],["i18-value",""],["type","hidden"],["value","Interests update failed"]],null,null,null,null,null))],function(n,e){var l=e.component;n(e,6,0,"primary"),n(e,9,0,!l.displayMode),n(e,14,0,"setup"===l.displayMode),n(e,20,0,"primary"),n(e,30,0,t["\u0275nov"](e,43)),n(e,32,0,l.interestControl),n(e,35,0,"Suchthemen","text"),n(e,38,0),n(e,43,0,""),n(e,47,0,t["\u0275nov"](e,28).value),n(e,49,0,t["\u0275unv"](e,49,0,t["\u0275nov"](e,50).transform(l.filteredOptions$))),n(e,59,0,l.requestStatus),n(e,61,0,l.userInterestsFetchError),n(e,63,0,!(null!=l.userInterests&&l.userInterests.length)),n(e,66,0),n(e,69,0,l.userInterests),n(e,71,0,null==l.suggestedInterests?null:l.suggestedInterests.length)},function(n,e){n(e,5,0,t["\u0275nov"](e,6)._toolbarRows.length>0,0===t["\u0275nov"](e,6)._toolbarRows.length),n(e,19,1,["standard"==t["\u0275nov"](e,20).appearance,"fill"==t["\u0275nov"](e,20).appearance,"outline"==t["\u0275nov"](e,20).appearance,"legacy"==t["\u0275nov"](e,20).appearance,t["\u0275nov"](e,20)._control.errorState,t["\u0275nov"](e,20)._canLabelFloat,t["\u0275nov"](e,20)._shouldLabelFloat(),t["\u0275nov"](e,20)._hasFloatingLabel(),t["\u0275nov"](e,20)._hideControlPlaceholder(),t["\u0275nov"](e,20)._control.disabled,t["\u0275nov"](e,20)._control.autofilled,t["\u0275nov"](e,20)._control.focused,"accent"==t["\u0275nov"](e,20).color,"warn"==t["\u0275nov"](e,20).color,t["\u0275nov"](e,20)._shouldForward("untouched"),t["\u0275nov"](e,20)._shouldForward("touched"),t["\u0275nov"](e,20)._shouldForward("pristine"),t["\u0275nov"](e,20)._shouldForward("dirty"),t["\u0275nov"](e,20)._shouldForward("valid"),t["\u0275nov"](e,20)._shouldForward("invalid"),t["\u0275nov"](e,20)._shouldForward("pending"),!t["\u0275nov"](e,20)._animationsEnabled]),n(e,28,1,[t["\u0275nov"](e,30).autocompleteAttribute,t["\u0275nov"](e,30).autocompleteDisabled?null:"combobox",t["\u0275nov"](e,30).autocompleteDisabled?null:"list",t["\u0275nov"](e,30).panelOpen&&t["\u0275nov"](e,30).activeOption?t["\u0275nov"](e,30).activeOption.id:null,t["\u0275nov"](e,30).autocompleteDisabled?null:t["\u0275nov"](e,30).panelOpen.toString(),t["\u0275nov"](e,30).autocompleteDisabled||!t["\u0275nov"](e,30).panelOpen?null:null==t["\u0275nov"](e,30).autocomplete?null:t["\u0275nov"](e,30).autocomplete.id,!t["\u0275nov"](e,30).autocompleteDisabled,t["\u0275nov"](e,34).ngClassUntouched,t["\u0275nov"](e,34).ngClassTouched,t["\u0275nov"](e,34).ngClassPristine,t["\u0275nov"](e,34).ngClassDirty,t["\u0275nov"](e,34).ngClassValid,t["\u0275nov"](e,34).ngClassInvalid,t["\u0275nov"](e,34).ngClassPending,t["\u0275nov"](e,35)._isServer,t["\u0275nov"](e,35).id,t["\u0275nov"](e,35).placeholder,t["\u0275nov"](e,35).disabled,t["\u0275nov"](e,35).required,t["\u0275nov"](e,35).readonly&&!t["\u0275nov"](e,35)._isNativeSelect||null,t["\u0275nov"](e,35)._ariaDescribedby||null,t["\u0275nov"](e,35).errorState,t["\u0275nov"](e,35).required.toString()]),n(e,37,0,t["\u0275nov"](e,38).inline,"primary"!==t["\u0275nov"](e,38).color&&"accent"!==t["\u0275nov"](e,38).color&&"warn"!==t["\u0275nov"](e,38).color),n(e,64,1,[t["\u0275nov"](e,66).disabled?null:t["\u0275nov"](e,66)._tabIndex,t["\u0275nov"](e,66)._ariaDescribedby||null,t["\u0275nov"](e,66).required.toString(),t["\u0275nov"](e,66).disabled.toString(),t["\u0275nov"](e,66).errorState,t["\u0275nov"](e,66).multiple,t["\u0275nov"](e,66).role,t["\u0275nov"](e,66).disabled,t["\u0275nov"](e,66).errorState,t["\u0275nov"](e,66).required,t["\u0275nov"](e,66).ariaOrientation,t["\u0275nov"](e,66)._uid])})}function rn(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"app-interest",[],null,null,null,un,G)),t["\u0275did"](1,114688,null,0,$,[u.a,z.a,B,Y.a,W.c],null,null)],function(n,e){n(e,1,0)},null)}var dn=t["\u0275ccf"]("app-interest",$,rn,{},{},[]),sn=l("xYTU"),cn=l("NcP4"),pn=l("F/XL"),mn=l("9Z1F"),vn=function(){function n(n){this.interestSvc=n}return n.prototype.resolve=function(n,e){return this.interestSvc.fetchUserInterests().pipe(Object(M.a)(function(n){return{data:n,error:null}}),Object(mn.a)(function(n){return Object(pn.a)({data:null,error:n})}))},n}(),fn=l("M2Lx"),hn=l("v9Dh"),bn=l("ZYjt"),gn=function(){return function(){}}(),In=l("4c35"),yn=l("Blfk"),wn=l("ze1e"),Sn=l("tLzf"),_n=l("YSh2");l.d(e,"InterestModuleNgFactory",function(){return Rn});var Rn=t["\u0275cmf"](o,[],function(n){return t["\u0275mod"]([t["\u0275mpd"](512,t.ComponentFactoryResolver,t["\u0275CodegenComponentFactoryResolver"],[[8,[i.a,dn,sn.a,sn.b,cn.a]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t["\u0275mpd"](4608,r.q,r.p,[t.LOCALE_ID,[2,r.L]]),t["\u0275mpd"](4608,k.e,k.e,[]),t["\u0275mpd"](4608,k.A,k.A,[]),t["\u0275mpd"](4608,vn,vn,[B]),t["\u0275mpd"](4608,D.c,D.c,[D.i,D.e,t.ComponentFactoryResolver,D.h,D.f,t.Injector,t.NgZone,r.d,R.b,[2,r.k]]),t["\u0275mpd"](5120,D.j,D.k,[D.c]),t["\u0275mpd"](5120,E.b,E.c,[D.c]),t["\u0275mpd"](4608,h.d,h.d,[]),t["\u0275mpd"](4608,fn.c,fn.c,[]),t["\u0275mpd"](5120,hn.b,hn.c,[D.c]),t["\u0275mpd"](4608,bn.e,h.e,[[2,h.i],[2,h.n]]),t["\u0275mpd"](1073742336,r.c,r.c,[]),t["\u0275mpd"](1073742336,k.z,k.z,[]),t["\u0275mpd"](1073742336,k.w,k.w,[]),t["\u0275mpd"](1073742336,k.k,k.k,[]),t["\u0275mpd"](1073742336,u.s,u.s,[[2,u.x],[2,u.o]]),t["\u0275mpd"](1073742336,gn,gn,[]),t["\u0275mpd"](1073742336,R.a,R.a,[]),t["\u0275mpd"](1073742336,h.n,h.n,[[2,h.f],[2,bn.f]]),t["\u0275mpd"](1073742336,x.b,x.b,[]),t["\u0275mpd"](1073742336,v.c,v.c,[]),t["\u0275mpd"](1073742336,In.g,In.g,[]),t["\u0275mpd"](1073742336,s.b,s.b,[]),t["\u0275mpd"](1073742336,O.c,O.c,[]),t["\u0275mpd"](1073742336,D.g,D.g,[]),t["\u0275mpd"](1073742336,h.y,h.y,[]),t["\u0275mpd"](1073742336,d.c,d.c,[]),t["\u0275mpd"](1073742336,W.f,W.f,[]),t["\u0275mpd"](1073742336,h.w,h.w,[]),t["\u0275mpd"](1073742336,h.t,h.t,[]),t["\u0275mpd"](1073742336,E.e,E.e,[]),t["\u0275mpd"](1073742336,w.g,w.g,[]),t["\u0275mpd"](1073742336,I.f,I.f,[]),t["\u0275mpd"](1073742336,fn.d,fn.d,[]),t["\u0275mpd"](1073742336,_.e,_.e,[]),t["\u0275mpd"](1073742336,A.c,A.c,[]),t["\u0275mpd"](1073742336,T.c,T.c,[]),t["\u0275mpd"](1073742336,yn.c,yn.c,[]),t["\u0275mpd"](1073742336,wn.a,wn.a,[]),t["\u0275mpd"](1073742336,c.a,c.a,[]),t["\u0275mpd"](1073742336,hn.e,hn.e,[]),t["\u0275mpd"](1073742336,Sn.a,Sn.a,[]),t["\u0275mpd"](1073742336,o,o,[]),t["\u0275mpd"](256,t.LOCALE_ID,"de",[]),t["\u0275mpd"](1024,u.m,function(){return[[{path:"",pathMatch:"full",component:$,resolve:{interestUser:vn}}]]},[]),t["\u0275mpd"](256,I.a,{separatorKeyCodes:[_n.g]},[]),t["\u0275mpd"](256,t.TRANSLATIONS_FORMAT,"xlf",[])])})},Rn7m:function(n,e,l){"use strict";l.d(e,"a",function(){return i}),l.d(e,"b",function(){return u});var t=l("CcnG"),o=(l("4tE/"),l("Ip0R")),i=(l("eDkP"),l("Fzqc"),l("Wf4p"),l("ZYjt"),l("dWZg"),l("4c35"),l("qAlS"),t["\u0275crt"]({encapsulation:2,styles:[".mat-autocomplete-panel{min-width:112px;max-width:280px;overflow:auto;-webkit-overflow-scrolling:touch;visibility:hidden;max-width:none;max-height:256px;position:relative;width:100%;border-bottom-left-radius:4px;border-bottom-right-radius:4px}.mat-autocomplete-panel.mat-autocomplete-visible{visibility:visible}.mat-autocomplete-panel.mat-autocomplete-hidden{visibility:hidden}.mat-autocomplete-panel-above .mat-autocomplete-panel{border-radius:0;border-top-left-radius:4px;border-top-right-radius:4px}.mat-autocomplete-panel .mat-divider-horizontal{margin-top:-1px}@media (-ms-high-contrast:active){.mat-autocomplete-panel{outline:solid 1px}}"],data:{}}));function a(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,[[2,0],["panel",1]],null,3,"div",[["class","mat-autocomplete-panel"],["role","listbox"]],[[8,"id",0]],null,null,null,null)),t["\u0275prd"](512,null,o.G,o.H,[t.IterableDiffers,t.KeyValueDiffers,t.ElementRef,t.Renderer2]),t["\u0275did"](2,278528,null,0,o.m,[o.G],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),t["\u0275ncd"](null,0)],function(n,e){n(e,2,0,"mat-autocomplete-panel",e.component._classList)},function(n,e){n(e,0,0,e.component.id)})}function u(n){return t["\u0275vid"](2,[t["\u0275qud"](402653184,1,{template:0}),t["\u0275qud"](671088640,2,{panel:0}),(n()(),t["\u0275and"](0,[[1,2]],null,0,null,a))],null,null)}}}]);