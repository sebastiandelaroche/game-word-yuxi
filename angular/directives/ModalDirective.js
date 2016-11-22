

class ModalDirective {

    constructor() {
        this.template = require("../html/directives/modal.html");
        this.restrict = 'E';
        this.scope = {};
    }

    // Directive link function
    link(scope, element, attrs) {

        console.log("scope", scope);
        console.log("element", element);
        console.log("attrs", attrs);

        scope.$on('$destroy', () => {
            scope.$destroy();
        });
    }
}


export default angular
    .module('modal.directive', [])
    .directive('modal', () => new ModalDirective)