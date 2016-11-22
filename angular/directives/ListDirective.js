

class ListDirective {

    constructor() {
        this.template = require("../html/directives/list.html");
        this.restrict = 'E';
        this.scope = {
            data: "=",
            columns: "=",
            self: "=",
            edit: "&",
            delete: "&"
        };
    }

    // Directive link function
    link(scope, element, attrs) {

        scope.showData = [];
        scope.showColumns = [];
        
        scope.activeEdit    = (typeof scope.edit() === "function") ? true : false;
        scope.activeDelete  = (typeof scope.delete() === "function") ? true : false;

        scope.$watch("data", (newData, oldData) => {
            scope.showData = newData || [];
        });

        scope.$watch("columns", (newColumns, oldColumns) => {
            scope.showColumns = newColumns || [];
        });

        scope.editDirective = (row) => {
            if(scope.activeEdit) {
                scope.edit().call(scope.self, row);
            }
        }  

        scope.deleteDirective = (row) => {
            if(scope.activeDelete) {
                scope.delete().call(scope.self, row);
            }
        }

        scope.$on('$destroy', () => {
            scope.$destroy();
        });
    }
}


export default angular
    .module('list.directive', [])
    .directive('list', () => new ListDirective)