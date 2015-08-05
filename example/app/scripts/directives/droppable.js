'use strict';

/**
 * @ngdoc directive
 * @name exampleApp.directive:droppable
 * @description
 * # droppable directive to implement drag-and-drop with native html5 support
 */
angular.module('exampleApp').directive('droppable', function () {
    return {
        scope: {
            drop: '&',
            bin: '=',
            droppable: '='
        },
        link: function (scope, element) {
            // again we need the native object
            var el = element[0];
            var droppableCssClass = scope.droppable || 'over';

            el.addEventListener('dragover', function (e) {
                    e.dataTransfer.dropEffect = 'move';
                    // allows us to drop
                    if (e.preventDefault) {
                        e.preventDefault();
                    }
                    angular.element(this).addClass(droppableCssClass);
                    return false;
                },
                false
            );

            el.addEventListener('dragenter', function () {
                    angular.element(this).addClass(droppableCssClass);
                    return false;
                },
                false
            );


            el.addEventListener('dragleave', function () {
                    angular.element(this).removeClass(droppableCssClass);
                    return false;
                },
                false
            );

            el.addEventListener('drop', function (e) {
                    var $this = angular.element(this);
                    // Stops some browsers from redirecting.
                    if (e.stopPropagation) {
                        e.stopPropagation();
                    }

                    $this.removeClass(droppableCssClass);

                    var itemId = e.dataTransfer.getData('Text');
                    var item = angular.element('#' + itemId);
                    var binId = this.id;

                    var dropInsert = $this.find('[drop-insert]');
                    if (dropInsert.length > 0){
                        dropInsert.append(item);
                    } else {
                        $this.append(item);
                    }

                    // call the passed drop function
                    scope.$apply(function (scope) {
                        var fn = scope.drop();
                        if (_.isFunction(fn)) {
                            fn(itemId, binId);
                        }
                    });

                    return false;
                },
                false
            );
        }
    };
});
