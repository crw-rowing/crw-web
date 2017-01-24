// Health/performance overview
app.directive('overview', function() {
    return {
        templateUrl: 'components/overview.component.html',
        scope: {
            type: '@',
            chartData: '<',
            view: '<',
            updateView: '&onUpdateView',
            tableColumns: '<'
        },
        bindToController: {
            tableData: '<'
        },
        restrict: 'E',
        controllerAs: '$ctrl',
        controller: function() {
            this.pane = 0;
            this.tabClick = function(index) {
                this.pane = index;
                this.updateTableView();
            };

            this.tableView = [];
            this.tablePage = 0;
            this.ROWS_PER_PAGE = 7;
            this.numPages = 2;

            this.updateTableView = function() {
                if(this.tableData) {
                    this.tableView = this.tableData.slice(
                        this.tablePage * this.ROWS_PER_PAGE,
                        (this.tablePage + 1) * this.ROWS_PER_PAGE);
                    this.numPages = Math.ceil(this.tableData.length / this.ROWS_PER_PAGE);
                }
            };

            this.updateTableView();

            this.next = function() {
                this.tablePage++;
                this.updateTableView();
            };
            this.prev = function() {
                if(this.tablePage > 0)
                    this.tablePage--;
                this.updateTableView();
            };
        }
    }
});
