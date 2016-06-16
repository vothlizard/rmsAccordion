(function () {
    var pDirective = function () {
        return {
            restrict: "A",
            transclude: true,
            replace: true,
            scope: {
                selected: "@"
            },
            template:
                "<div style='margin-bottom:0;'  class='panel-group' ng-transclude></div>",
            link: function (scope, element, attrs) {

                // give this element a unique id
                var id = element.attr("id");
                if (!id) {
                    id = "rms-acc" + scope.$id;
                    element.attr("id", id);
                }

                var arr = element.find(".accordion-toggle");

                arr.off('click.rmsAccordion').on('click.rmsAccordion', function () {
                    $(this).next().slideToggle('fast');
                    $('.panel-collapse').not($(this).next()).slideUp('fast');
                });

                if (scope.selected === "true") {
                    element.find(".panel-collapse").addClass('default');
                }
            },
            controller: function ($scope) {

            }
        };
    };

    var cDirective = function () {
        return {
            require: "^rmsAccordion",
            restrict: "A",
            transclude: true,
            replace: true,
            scope: {
                title: "@"
            },
            template:
                "<div style='margin-bottom:0;' class='panel panel-default' >" +
                "  <div class='accordion-toggle panel-heading' style='background:#3c3c3c; color:white; font-weight:600'>" +
                "  </div>" +
                "<div class='panel-collapse'>" +
                "  <div class='panel-body rms-accordion-panel-body' style='background:#f4f4f4' ng-transclude></div>" +
                "  </div>" +
                "</div>",
            link: function (scope, element, attrs) {
                scope.$watch("title", function () {
                    var header = element.find(".accordion-toggle");
                    var content = '<span>' + scope.title + '</span><span class="pull-right rms-accordion-counter"></span>';
                    header.html(content);
                });
            }
        };
    };

    angular.module('rmsAngularJSControls',[])
        .directive('rmsAccordion', pDirective)
        .directive('rmsPane', cDirective);

}());