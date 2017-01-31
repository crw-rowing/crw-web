// Health/performance overview
app.directive('overview', function() {
    return {
        templateUrl: 'components/overview.component.html',
        scope: {
            caption: '@',
            crwId: '@',
            chartData: '<',
            view: '<',
            updateView: '&onUpdateView',
            tableColumns: '<',
            tableFilter: '<'
        },
        bindToController: {
            tableData: '=',
            onUpdateTableFilter: '&'
        },
        restrict: 'E',
        controllerAs: '$ctrl',
        controller: function() {
            // 0: graph, 1: table
            this.pane = 0;
            this.tabClick = function(index) {
                this.pane = index;
                this.updateTableView();
            };

            // Subset of tableData, the $ROWS_PER_PAGE records to be shown in the table
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

            this.updateTableFilter = function(filter) {
                this.tableData = this.onUpdateTableFilter({filter: filter});
                this.updateTableView();
            };

            this.updateTableView();

            // Navigate table pages
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
