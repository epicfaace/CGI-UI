$(document).ready(function () {
    function parseQuery(queryString) {
        var query = {};
        var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i].split('=');
            query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
        }
        return query;
    }
    var ENDPOINT_URL = "https://ajj1waqm7l.execute-api.us-east-1.amazonaws.com/api/search";
    $("form").submit(function (e) {
        e.preventDefault();
        $("#button").val("Loading...");
        initGrid($("#query").val());
    });
    var parsedQuery = parseQuery(window.location.search);
    if (parsedQuery["query"]) {
        pageSize = parsedQuery["pageSize"];
        pageIndex = parsedQuery["pageIndex"];
        query = parsedQuery["query"];
        $("#query").val(query);
        initGrid(query, pageIndex, pageSize);
    }
    function initGrid(query, pageIndex, pageSize) {
        console.log(arguments);
        pageIndex = pageIndex || 1;
        pageSize = pageSize || 20;
        

        $("#jsGrid").jsGrid({
            width: "100%",
            height: "400px",

            inserting: false,
            editing: false,
            sorting: true,
            paging: true,
            pageLoading: true,
            autoload: true,
            pageIndex: pageIndex,
            pageSize: pageSize,

            //   data: clients,

            controller: {
                loadData: function (filter) {
                    var startIndex = (filter.pageIndex - 1) * filter.pageSize;
                    var queryString = "query=" + query + "&start=" + startIndex + "&size=" + filter.pageSize;
                    return $.ajax({
                        url: ENDPOINT_URL + "?" + queryString,
                        method: 'GET', contentType: 'application/json', responseType: 'application/json'
                    }).then(function (results) {
                        $("#button").val("Submit");
                        if (history.pushState) {
                            var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' +
                                "query=" + query + "&pageIndex=" + filter.pageIndex + "&pageSize=" + filter.pageSize;
                            window.history.pushState({path:newurl},'',newurl);
                        }
                        else {
                            throw "Error, get a new browser";
                        }
                        // window.location.search = queryString;
                        return {
                            data: results.hits.hit.map(e => e.fields),
                            itemsCount: results.hits.found
                        };
                    });
                }
            },

            fields: [
                { name: "name", type: "text" },
                { name: "party", type: "text"},
                { name: "twitter", type: "text"},
                // { name: "followers_count", type: "number", itemTemplate: e => console.log(e) },
                // { name: "urls", type: "text", width: 10 },
                { name: "tweet", type: "text", width: 500 },

            ]
        });
    }
});