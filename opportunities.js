document.addEventListener('DOMContentLoaded', () => {
    const width = document.getElementById('opportunities-matrix').offsetWidth;
    const height = document.getElementById('opportunities-matrix').offsetHeight;
    const margin = { top: 50, right: 60, bottom: 60, left: 60 };
    
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    // 创建SVG容器
    const svg = d3.select("#opportunities-matrix")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
    
    // 为内部图表创建一个组
    const g = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    // 创建工具提示div
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
    
    // 定义机会数据
    const opportunities = [
        { 
            id: 1, 
            name: "AEL电极", 
            marketSize: 85, 
            growthRate: 28, 
            strategicFit: 9, 
            description: "碱性电解槽用镍电极",
            applications: "主要制造商如ThyssenKrupp Nucera, NEL ASA",
            requirements: "KOH耐受性(20-30%)，耐久性，催化性能",
            category: "nickel"
        },
        { 
            id: 2, 
            name: "PEM母线", 
            marketSize: 65, 
            growthRate: 35, 
            strategicFit: 7, 
            description: "PEM电解槽用铜母线",
            applications: "Siemens Energy, ITM Power系统配电",
            requirements: "高载流能力，耐腐蚀性",
            category: "copper"
        },
        { 
            id: 3, 
            name: "AEL集流器", 
            marketSize: 50, 
            growthRate: 30, 
            strategicFit: 8.5, 
            description: "镍网集流器",
            applications: "优化用于碱性电解槽",
            requirements: "精确表面积控制，碱性环境稳定性",
            category: "nickel-mesh"
        },
        { 
            id: 4, 
            name: "SOEC电极", 
            marketSize: 30, 
            growthRate: 45, 
            strategicFit: 6, 
            description: "固体氧化物电池用镍-陶瓷电极",
            applications: "与Sunfire, Topsoe的高温电解",
            requirements: "温度稳定性(700-850°C)",
            category: "nickel" 
        },
        { 
            id: 5, 
            name: "AFC部件", 
            marketSize: 25, 
            growthRate: 20, 
            strategicFit: 7.5, 
            description: "碱性燃料电池用镍部件",
            applications: "AFC Energy系统",
            requirements: "长期稳定性，优化",
            category: "nickel"
        },
        { 
            id: 6, 
            name: "PEM堆栈连接", 
            marketSize: 40, 
            growthRate: 25, 
            strategicFit: 6.5, 
            description: "PEM燃料电池堆栈用铜母线",
            applications: "Ballard, Plug Power, Nuvera系统",
            requirements: "精密制造，专用涂层",
            category: "copper"
        },
        { 
            id: 7, 
            name: "GDL支撑网", 
            marketSize: 35, 
            growthRate: 22, 
            strategicFit: 7, 
            description: "气体扩散层支撑网",
            applications: "多种燃料电池技术",
            requirements: "精确孔径尺寸，结构完整性",
            category: "nickel-mesh"
        },
        { 
            id: 8, 
            name: "催化剂载体", 
            marketSize: 20, 
            growthRate: 26, 
            strategicFit: 5.5, 
            description: "作为催化剂载体的镍网",
            applications: "先进电解应用",
            requirements: "表面处理能力",
            category: "nickel-mesh"
        },
        { 
            id: 9, 
            name: "电转气母线", 
            marketSize: 55, 
            growthRate: 18, 
            strategicFit: 6, 
            description: "重型铜母线",
            applications: "大型P2G设施配电",
            requirements: "超高载流能力，工业可靠性",
            category: "copper"
        },
        { 
            id: 10, 
            name: "储罐部件", 
            marketSize: 15, 
            growthRate: 15, 
            strategicFit: 4, 
            description: "专用镍部件",
            applications: "新型氢气存储技术",
            requirements: "材料兼容性研究",
            category: "nickel"
        }
    ];
    
    // 定义比例尺
    const xScale = d3.scaleLinear()
        .domain([0, 10])
        .range([0, innerWidth]);
    
    const yScale = d3.scaleLinear()
        .domain([0, 50])
        .range([innerHeight, 0]);
    
    const sizeScale = d3.scaleLinear()
        .domain([d3.min(opportunities, d => d.marketSize), d3.max(opportunities, d => d.marketSize)])
        .range([8, 25]);
    
    const colorScale = d3.scaleOrdinal()
        .domain(["copper", "nickel", "nickel-mesh"])
        .range(["#f59e0b", "#64748b", "#6366f1"]);
    
    // 创建坐标轴
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
    
    // 添加X轴
    g.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(xAxis);
    
    // 添加Y轴
    g.append("g")
        .attr("class", "y-axis")
        .call(yAxis);
    
    // 添加坐标轴标签
    g.append("text")
        .attr("class", "axis-label")
        .attr("x", innerWidth / 2)
        .attr("y", innerHeight + 40)
        .style("text-anchor", "middle")
        .text("战略契合度 (1-10)");
    
    g.append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("x", -innerHeight / 2)
        .attr("y", -40)
        .style("text-anchor", "middle")
        .text("增长率 (%)");
    
    // 添加标题
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .text("产品机会评估");
    
    // 添加网格线
    g.append("g")
        .attr("class", "grid")
        .selectAll("line")
        .data(xScale.ticks())
        .enter()
        .append("line")
        .attr("class", "axis-line")
        .attr("x1", d => xScale(d))
        .attr("x2", d => xScale(d))
        .attr("y1", 0)
        .attr("y2", innerHeight);
    
    g.append("g")
        .attr("class", "grid")
        .selectAll("line")
        .data(yScale.ticks())
        .enter()
        .append("line")
        .attr("class", "axis-line")
        .attr("x1", 0)
        .attr("x2", innerWidth)
        .attr("y1", d => yScale(d))
        .attr("y2", d => yScale(d));
    
    // 添加象限标签
    g.append("text")
        .attr("x", innerWidth * 0.25)
        .attr("y", innerHeight * 0.25)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .style("fill", "#9ca3af")
        .text("较低优先级");
    
    g.append("text")
        .attr("x", innerWidth * 0.75)
        .attr("y", innerHeight * 0.25)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .style("fill", "#4b5563")
        .style("font-weight", "bold")
        .text("战略机会");
    
    g.append("text")
        .attr("x", innerWidth * 0.25)
        .attr("y", innerHeight * 0.75)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .style("fill", "#9ca3af")
        .text("稍后考虑");
    
    g.append("text")
        .attr("x", innerWidth * 0.75)
        .attr("y", innerHeight * 0.75)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .style("fill", "#4b5563")
        .text("战术机会");
    
    // 添加机会气泡
    g.selectAll(".opportunity-bubble")
        .data(opportunities)
        .enter()
        .append("circle")
        .attr("class", "opportunity-bubble")
        .attr("cx", d => xScale(d.strategicFit))
        .attr("cy", d => yScale(d.growthRate))
        .attr("r", d => sizeScale(d.marketSize))
        .attr("fill", d => colorScale(d.category))
        .attr("opacity", 0.7)
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
        .on("mouseover", (event, d) => {
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            
            tooltip.html(`<strong>${d.name}</strong><br>
                          ${d.description}<br>
                          市场规模: €${d.marketSize}M<br>
                          增长率: ${d.growthRate}%<br>
                          战略契合度: ${d.strategicFit}/10<br>
                          <br>
                          <strong>应用:</strong> ${d.applications}<br>
                          <strong>要求:</strong> ${d.requirements}`)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", () => {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });
    
    // 为顶级机会添加气泡标签
    const topOpportunities = opportunities
        .sort((a, b) => (b.strategicFit * b.growthRate) - (a.strategicFit * a.growthRate))
        .slice(0, 3);
    
    g.selectAll(".opportunity-label")
        .data(topOpportunities)
        .enter()
        .append("text")
        .attr("class", "opportunity-label")
        .attr("x", d => xScale(d.strategicFit))
        .attr("y", d => yScale(d.growthRate) - sizeScale(d.marketSize) - 5)
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .style("font-weight", "bold")
        .text(d => d.name);
    
    // 添加图例
    const legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", `translate(${width - 150}, ${margin.top})`);
    
    const legendItems = [
        { label: "铜母线", color: "#f59e0b" },
        { label: "镍电极", color: "#64748b" },
        { label: "镍网", color: "#6366f1" }
    ];
    
    legendItems.forEach((item, i) => {
        const legendGroup = legend.append("g")
            .attr("transform", `translate(0, ${i * 20})`);
        
        legendGroup.append("circle")
            .attr("r", 6)
            .attr("fill", item.color)
            .attr("opacity", 0.7)
            .attr("stroke", "#fff")
            .attr("stroke-width", 1.5);
        
        legendGroup.append("text")
            .attr("x", 15)
            .attr("y", 4)
            .style("font-size", "12px")
            .text(item.label);
    });
    
    // 尺寸图例
    const sizeLegend = svg.append("g")
        .attr("class", "size-legend")
        .attr("transform", `translate(${margin.left}, ${height - 30})`);
    
    sizeLegend.append("text")
        .attr("x", 0)
        .attr("y", 0)
        .style("font-size", "12px")
        .text("气泡大小代表市场规模(€M)");
});
