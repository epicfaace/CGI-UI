$(document).ready(function () {
    var ENDPOINT_URL = "https://ajj1waqm7l.execute-api.us-east-1.amazonaws.com/api/search";
    $("form").submit(function (e) {
        e.preventDefault();
        $("#button").val("Loading...");
        initGrid();
    })

    function initGrid() {

        var query = $("#field").val();

        $("#jsGrid").jsGrid({
            width: "100%",
            height: "400px",

            inserting: false,
            editing: false,
            sorting: true,
            paging: true,
            pageLoading: true,
            autoload: true,

            //   data: clients,

            controller: {
                loadData: function (filter) {
                    var startIndex = (filter.pageIndex - 1) * filter.pageSize;
                    return $.ajax({
                        url: ENDPOINT_URL + "?query=" + query + "&start=" + startIndex + "&size=" + filter.pageSize,
                        method: 'GET', contentType: 'application/json', responseType: 'application/json'
                    }).then(function (results) {
                        $("#button").val("Submit");
                        return {
                            data: results.hits.hit.map(e => e.fields),
                            itemsCount: results.hits.found
                        };
                    });
                }
            },

            fields: [
                { name: "name", type: "text" },
                { name: "phone", type: "text" },
                { name: "twitter", type: "text" },
                { name: "followers_count", type: "number", itemTemplate: e => console.log(e) },
                { name: "urls", type: "text" },
                { name: "tweet", type: "text", width: "500" },

            ]
        });
    }
});