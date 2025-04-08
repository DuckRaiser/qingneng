document.addEventListener('DOMContentLoaded', () => {
    const width = document.getElementById('partners-map').offsetWidth;
    const height = 450;
    
    // 创建SVG容器
    const svg = d3.select("#partners-map")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
    
    // 创建工具提示div
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
    
    // 定义欧洲地图投影
    const projection = d3.geoMercator()
        .center([10, 55])
        .scale(width * 1.3)
        .translate([width / 2, height / 2]);
    
    const path = d3.geoPath().projection(projection);
    
    // 加载欧洲地图数据
    d3.json("https://raw.githubusercontent.com/leakyMirror/map-of-europe/master/GeoJSON/europe.geojson")
        .then(europeData => {
            // 绘制地图
            svg.selectAll(".country")
                .data(europeData.features)
                .enter()
                .append("path")
                .attr("class", "country")
                .attr("d", path)
                .attr("fill", "#f3f4f6")
                .attr("stroke", "#d1d5db")
                .attr("stroke-width", 0.5);
            
            // 定义公司数据，包括位置和类型
            const companies = [
                { name: "Linde plc", type: "electrolyzer", lat: 48.1351, lng: 11.5820, country: "Germany", priority: "high" }, // Munich
                { name: "Air Liquide", type: "electrolyzer", lat: 48.8566, lng: 2.3522, country: "France", priority: "high" }, // Paris
                { name: "Siemens Energy", type: "electrolyzer", lat: 48.1351, lng: 11.5820, country: "Germany", priority: "high" }, // Munich
                { name: "Enapter AG", type: "electrolyzer", lat: 52.5200, lng: 13.4050, country: "Germany", priority: "medium" }, // Berlin
                { name: "NEL ASA", type: "electrolyzer", lat: 59.9139, lng: 10.7522, country: "Norway", priority: "very-high" }, // Oslo
                { name: "ThyssenKrupp Nucera", type: "electrolyzer", lat: 51.5142, lng: 7.4653, country: "Germany", priority: "very-high" }, // Dortmund
                { name: "McPhy", type: "electrolyzer", lat: 45.7578, lng: 4.8320, country: "France", priority: "high" }, // Lyon
                { name: "ITM Power", type: "electrolyzer", lat: 53.3811, lng: -1.4701, country: "UK", priority: "high" }, // Sheffield
                { name: "Sunfire", type: "electrolyzer", lat: 51.0504, lng: 13.7373, country: "Germany", priority: "medium" }, // Dresden
                { name: "Topsoe", type: "electrolyzer", lat: 55.6761, lng: 12.5683, country: "Denmark", priority: "medium" }, // Copenhagen
                { name: "AFC Energy", type: "fuelcell", lat: 51.5074, lng: -0.1278, country: "UK", priority: "high" }, // London
                { name: "Ballard Power Systems", type: "fuelcell", lat: 57.0088, lng: 9.9871, country: "Denmark", priority: "medium" }, // Aalborg
                { name: "Ceres Power", type: "fuelcell", lat: 51.5074, lng: -0.1278, country: "UK", priority: "medium" }, // London
                { name: "Plug Power", type: "fuelcell", lat: 49.6116, lng: 6.1319, country: "Luxembourg", priority: "medium" }, // Luxembourg
                { name: "HydroSolid", type: "materials", lat: 52.3676, lng: 4.9041, country: "Netherlands", priority: "medium" }, // Amsterdam
                { name: "Greenerity", type: "materials", lat: 48.7758, lng: 9.1829, country: "Germany", priority: "high" }, // Stuttgart
                { name: "Heraeus", type: "materials", lat: 50.1109, lng: 8.6821, country: "Germany", priority: "medium" }, // Frankfurt
                { name: "Engie SA", type: "integrator", lat: 48.8566, lng: 2.3522, country: "France", priority: "medium" }, // Paris
                { name: "Lhyfe", type: "integrator", lat: 47.2184, lng: -1.5536, country: "France", priority: "medium" }, // Nantes
                { name: "TES H2", type: "integrator", lat: 53.5511, lng: 9.9937, country: "Germany", priority: "low" } // Hamburg
            ];
            
            // 绘制公司节点
            svg.selectAll(".company")
                .data(companies)
                .enter()
                .append("circle")
                .attr("class", "company")
                .attr("cx", d => projection([d.lng, d.lat])[0])
                .attr("cy", d => projection([d.lng, d.lat])[1])
                .attr("r", d => {
                    if (d.priority === "very-high") return 10;
                    if (d.priority === "high") return 8;
                    if (d.priority === "medium") return 6;
                    return 4;
                })
                .attr("fill", d => {
                    switch(d.type) {
                        case "electrolyzer": return "#3b82f6";
                        case "fuelcell": return "#10b981";
                        case "materials": return "#f59e0b";
                        case "integrator": return "#8b5cf6";
                        default: return "#6b7280";
                    }
                })
                .attr("stroke", "#ffffff")
                .attr("stroke-width", 1.5)
                .attr("opacity", 0.8)
                .on("mouseover", (event, d) => {
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", .9);
                    
                    let priorityText = "";
                    switch(d.priority) {
                        case "very-high": priorityText = "非常高优先级"; break;
                        case "high": priorityText = "高优先级"; break;
                        case "medium": priorityText = "中等优先级"; break;
                        case "low": priorityText = "低优先级"; break;
                    }
                    
                    let typeText = "";
                    switch(d.type) {
                        case "electrolyzer": typeText = "电解槽制造商"; break;
                        case "fuelcell": typeText = "燃料电池制造商"; break;
                        case "materials": typeText = "材料与部件"; break;
                        case "integrator": typeText = "系统集成商"; break;
                    }
                    
                    tooltip.html(`<strong>${d.name}</strong><br>${typeText}<br>${d.country}<br><span style="color: ${d.priority === 'very-high' ? '#ef4444' : d.priority === 'high' ? '#f97316' : '#a3a3a3'}">${priorityText}</span>`)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 28) + "px");
                })
                .on("mouseout", () => {
                    tooltip.transition()
                        .duration(500)
                        .style("opacity", 0);
                });
            
            // 添加地图图例
            const legend = svg.append("g")
                .attr("class", "legend")
                .attr("transform", "translate(20, 20)");
            
            const legendItems = [
                { label: "电解槽制造商", color: "#3b82f6" },
                { label: "燃料电池制造商", color: "#10b981" },
                { label: "材料与部件", color: "#f59e0b" },
                { label: "系统集成商", color: "#8b5cf6" }
            ];
            
            legendItems.forEach((item, i) => {
                const legendGroup = legend.append("g")
                    .attr("transform", `translate(0, ${i * 20})`);
                
                legendGroup.append("circle")
                    .attr("r", 6)
                    .attr("fill", item.color)
                    .attr("stroke", "#ffffff")
                    .attr("stroke-width", 1);
                
                legendGroup.append("text")
                    .attr("x", 15)
                    .attr("y", 4)
                    .style("font-size", "12px")
                    .text(item.label);
            });
            
            // 优先级图例
            const priorityLegend = svg.append("g")
                .attr("class", "priority-legend")
                .attr("transform", `translate(${width - 150}, 20)`);
            
            const priorityItems = [
                { label: "非常高优先级", size: 10 },
                { label: "高优先级", size: 8 },
                { label: "中等优先级", size: 6 },
                { label: "低优先级", size: 4 }
            ];
            
            priorityItems.forEach((item, i) => {
                const priorityGroup = priorityLegend.append("g")
                    .attr("transform", `translate(0, ${i * 20})`);
                
                priorityGroup.append("circle")
                    .attr("r", item.size)
                    .attr("fill", "#6b7280")
                    .attr("stroke", "#ffffff")
                    .attr("stroke-width", 1);
                
                priorityGroup.append("text")
                    .attr("x", 15)
                    .attr("y", 4)
                    .style("font-size", "12px")
                    .text(item.label);
            });
        })
        .catch(error => {
            console.error("加载欧洲地图数据时出错:", error);
        });
});
