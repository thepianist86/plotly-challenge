var fpath = 'static/data/samples.json';

var metadata = [];

d3.json(fpath).then(function (data) {

    for (var i = 0; i < data.metadata.length; i++) {
        metadata.push(data.metadata[i]);
    }
    d3.select('#selDataset')
        .selectAll('nameOptions')
        .data(metadata)
        .enter()
        .append('option')
        .text(function (tsID) { return tsID.id });

});

d3.selectAll('#selDataset').on('change', updateCharts);

function updateCharts() {
    var dropdownMenu = d3.selectAll('#selDataset');
    var tsID = dropdownMenu.property('value');
    updateDemographics(tsID);
};

function updateDemographics(tsID) {
    var data = metadata.filter(data => { return data["id"] == tsID })

    d3.select('#sample-metadata')
        .selectAll('panels')
        .data(data)
        .enter()
        .append('panel-body')
        .text(function (d) { 
            var tsID = ("ID: " + d.id);
            return tsID})
        .append('panel-body')
        .text(function (d) { 
            var ethnicity = ("Ethnicity: " + d.ethnicity);
            return ethnicity})
}
