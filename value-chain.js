document.addEventListener('DOMContentLoaded', () => {
    const width = document.getElementById('value-chain-diagram').offsetWidth;
    const height = 300;
    
    // 定义主SVG容器
    const svg = d3.select("#value-chain-diagram")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
    
    // 定义价值链的数据结构
    const data = {
        nodes: [
            { id: "raw", label: "原材料", group: 1, x: 100, y: 80, width: 120, height: 50 },
            { id: "comp", label: "部件制造", group: 2, x: 300, y: 80, width: 180, height: 50 },
            { id: "stack", label: "堆栈组装", group: 3, x: 560, y: 80, width: 120, height: 50 },
            { id: "sys", label: "系统集成", group: 3, x: 760, y: 80, width: 130, height: 50 },
            
            { id: "copper", label: "铜", group: 1, x: 80, y: 160, width: 80, height: 40 },
            { id: "nickel", label: "镍", group: 1, x: 170, y: 160, width: 80, height: 40 },
            
            { id: "busbars", label: "铜母线", group: 2, x: 250, y: 160, width: 120, height: 40, highlight: true },
            { id: "electrodes", label: "镍电极", group: 2, x: 380, y: 160, width: 130, height: 40, highlight: true },
            { id: "nets", label: "镍网", group: 2, x: 520, y: 160, width: 100, height: 40, highlight: true },
            
            { id: "aelstack", label: "AEL堆栈", group: 3, x: 520, y: 230, width: 100, height: 40 },
            { id: "pemstack", label: "PEM堆栈", group: 3, x: 630, y: 230, width: 100, height: 40 },
            
            { id: "electrolyzers", label: "电解槽", group: 3, x: 700, y: 160, width: 100, height: 40 },
            { id: "fuelcells", label: "燃料电池", group: 3, x: 810, y: 160, width: 100, height: 40 }
        ],
        links: [
            { source: "raw", target: "comp", value: 1 },
            { source: "comp", target: "stack", value: 1 },
            { source: "stack", target: "sys", value: 1 },
            
            { source: "copper", target: "busbars", value: 1 },
            { source: "nickel", target: "electrodes", value: 1 },
            { source: "nickel", target: "nets", value: 1 },
            
            { source: "busbars", target: "aelstack", value: 1 },
            { source: "busbars", target: "pemstack", value: 1 },
            { source: "electrodes", target: "aelstack", value: 1 },
            { source: "nets", target: "aelstack", value: 1 },
            { source: "nets", target: "pemstack", value: 1 },
            
            { source: "aelstack", target: "electrolyzers", value: 1 },
            { source: "pemstack", target: "electrolyzers", value: 1 },
            { source: "aelstack", target: "fuelcells", value: 1 },
            { source: "pemstack", target: "fuelcells", value: 1 }
        ]
    };
    
    // 创建工具提示div
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
    
    // 绘制链接/路径
    const link = svg.selectAll(".link")
        .data(data.links)
        .enter()
        .append("path")
        .attr("class", "link")
        .attr("d", d => {
            const sourceNode = data.nodes.find(n => n.id === d.source);
            const targetNode = data.nodes.find(n => n.id === d.target);
            
            const sourceX = sourceNode.x + sourceNode.width / 2;
            const sourceY = sourceNode.y + sourceNode.height;
            const targetX = targetNode.x + targetNode.width / 2;
            const targetY = targetNode.y;
            
            return `M${sourceX},${sourceY} C${sourceX},${(sourceY + targetY) / 2} ${targetX},${(sourceY + targetY) / 2} ${targetX},${targetY}`;
        })
        .style("stroke", "#999")
        .style("stroke-width", d => Math.sqrt(d.value) * 1.5 + "px")
        .style("fill", "none")
        .style("stroke-opacity", 0.6);
    
    // 绘制节点
    const node = svg.selectAll(".node")
        .data(data.nodes)
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", d => `translate(${d.x},${d.y})`);
    
    // 为节点添加矩形
    node.append("rect")
        .attr("width", d => d.width)
        .attr("height", d => d.height)
        .attr("rx", 4)
        .attr("ry", 4)
        .style("fill", d => {
            if (d.highlight) {
                return "#3b82f6";
            } else if (d.group === 1) {
                return "#e5e7eb";
            } else if (d.group === 2) {
                return "#dbeafe";
            } else {
                return "#f3f4f6";
            }
        })
        .style("stroke", d => d.highlight ? "#2563eb" : "#d1d5db")
        .style("stroke-width", 1.5)
        .on("mouseover", (event, d) => {
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
                
            let content = `<strong>${d.label}</strong>`;
            
            if (d.id === "busbars") {
                content += `<br>用途：配电，堆栈连接`;
                content += `<br>关键要求：高载流能力，耐腐蚀性`;
            } else if (d.id === "electrodes") {
                content += `<br>用途：AEL，AFC技术`;
                content += `<br>关键要求：KOH耐受性，稳定性`;
            } else if (d.id === "nets") {
                content += `<br>用途：集流器，GDL，催化剂载体`;
                content += `<br>关键要求：精确孔径，导电性`;
            }
            
            tooltip.html(content)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", () => {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });
    
    // 为节点添加文本
    node.append("text")
        .attr("x", d => d.width / 2)
        .attr("y", d => d.height / 2)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .style("font-size", "12px")
        .style("fill", d => d.highlight ? "white" : "black")
        .text(d => d.label);
    
    // 添加图例
    const legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", "translate(20, 20)");
    
    legend.append("rect")
        .attr("width", 12)
        .attr("height", 12)
        .attr("rx", 2)
        .attr("ry", 2)
        .style("fill", "#3b82f6");
    
    legend.append("text")
        .attr("x", 20)
        .attr("y", 10)
        .style("font-size", "12px")
        .text("我司的关键产品");
});
