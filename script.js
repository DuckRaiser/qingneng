// 初始化Lucide图标
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    
    // 行业部分的标签切换
    const btnOverview = document.getElementById('btn-overview');
    const btnCompanies = document.getElementById('btn-companies');
    const industryOverview = document.getElementById('industry-overview');
    const industryCompanies = document.getElementById('industry-companies');
    
    btnOverview.addEventListener('click', () => {
        industryOverview.classList.remove('hidden');
        industryOverview.classList.add('block');
        industryCompanies.classList.remove('block');
        industryCompanies.classList.add('hidden');
        
        btnOverview.classList.add('bg-blue-600', 'text-white');
        btnOverview.classList.remove('bg-gray-200', 'text-gray-700');
        btnCompanies.classList.add('bg-gray-200', 'text-gray-700');
        btnCompanies.classList.remove('bg-blue-600', 'text-white');
    });
    
    btnCompanies.addEventListener('click', () => {
        industryOverview.classList.remove('block');
        industryOverview.classList.add('hidden');
        industryCompanies.classList.remove('hidden');
        industryCompanies.classList.add('block');
        
        btnOverview.classList.remove('bg-blue-600', 'text-white');
        btnOverview.classList.add('bg-gray-200', 'text-gray-700');
        btnCompanies.classList.remove('bg-gray-200', 'text-gray-700');
        btnCompanies.classList.add('bg-blue-600', 'text-white');
    });
    
    // 合作伙伴部分的标签切换
    const btnMap = document.getElementById('btn-map');
    const btnList = document.getElementById('btn-list');
    const partnerMapView = document.getElementById('partner-map-view');
    const partnerListView = document.getElementById('partner-list-view');
    
    btnMap.addEventListener('click', () => {
        partnerMapView.classList.remove('hidden');
        partnerMapView.classList.add('block');
        partnerListView.classList.remove('block');
        partnerListView.classList.add('hidden');
        
        btnMap.classList.add('bg-blue-600', 'text-white');
        btnMap.classList.remove('bg-gray-200', 'text-gray-700');
        btnList.classList.add('bg-gray-200', 'text-gray-700');
        btnList.classList.remove('bg-blue-600', 'text-white');
    });
    
    btnList.addEventListener('click', () => {
        partnerMapView.classList.remove('block');
        partnerMapView.classList.add('hidden');
        partnerListView.classList.remove('hidden');
        partnerListView.classList.add('block');
        
        btnMap.classList.remove('bg-blue-600', 'text-white');
        btnMap.classList.add('bg-gray-200', 'text-gray-700');
        btnList.classList.remove('bg-gray-200', 'text-gray-700');
        btnList.classList.add('bg-blue-600', 'text-white');
    });

    // 填充公司表格
    populateCompaniesTable();
    
    // 填充合作伙伴表格
    populatePartnersTable();
});

function populateCompaniesTable() {
    const companiesData = [
        { 
            subIndustry: "碱性电解槽", 
            players: "ThyssenKrupp Nucera, NEL ASA, McPhy", 
            componentRelevance: "镍电极（阳极/阴极），镍网",
            position: "市场领导者"
        },
        { 
            subIndustry: "PEM电解槽", 
            players: "Siemens Energy, ITM Power, Elogen", 
            componentRelevance: "铜母线（配电）",
            position: "快速增长"
        },
        { 
            subIndustry: "固体氧化物电解槽", 
            players: "Sunfire, Topsoe", 
            componentRelevance: "镍-陶瓷电极，结构件",
            position: "新兴技术"
        },
        { 
            subIndustry: "碱性燃料电池", 
            players: "AFC Energy", 
            componentRelevance: "镍电极，镍网",
            position: "专业"
        },
        { 
            subIndustry: "PEM燃料电池", 
            players: "Ballard Power Systems, Nuvera, Plug Power", 
            componentRelevance: "铜母线（堆栈连接）",
            position: "已建立"
        },
        { 
            subIndustry: "固体氧化物燃料电池", 
            players: "Ceres Power, FuelCell Energy", 
            componentRelevance: "镍-YSZ陶瓷阳极，集流器",
            position: "增长中"
        },
        { 
            subIndustry: "氢气压缩", 
            players: "Hiperbaric, CYRUS", 
            componentRelevance: "电气系统铜母线",
            position: "专业"
        },
        { 
            subIndustry: "氢气储存", 
            players: "HydroSolid, Voith HySTech", 
            componentRelevance: "新型存储用镍部件",
            position: "研发阶段"
        },
        { 
            subIndustry: "电转气设施", 
            players: "Engie, Lhyfe, TES H2", 
            componentRelevance: "集成电力系统，母线",
            position: "大规模"
        }
    ];
    
    const tableBody = document.getElementById('companies-table');
    
    companiesData.forEach(company => {
        const row = document.createElement('tr');
        row.classList.add('border-b', 'hover:bg-gray-50');
        
        row.innerHTML = `
            <td class="py-3 px-4 font-medium">${company.subIndustry}</td>
            <td class="py-3 px-4">${company.players}</td>
            <td class="py-3 px-4">${company.componentRelevance}</td>
            <td class="py-3 px-4">
                <span class="inline-flex rounded-full ${getPositionColor(company.position)} text-xs font-medium px-2.5 py-0.5">
                    ${company.position}
                </span>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

function getPositionColor(position) {
    switch(position) {
        case '市场领导者':
            return 'bg-blue-100 text-blue-800';
        case '快速增长':
            return 'bg-green-100 text-green-800';
        case '新兴技术':
            return 'bg-purple-100 text-purple-800';
        case '专业':
            return 'bg-yellow-100 text-yellow-800';
        case '已建立':
            return 'bg-gray-100 text-gray-800';
        case '增长中':
            return 'bg-indigo-100 text-indigo-800';
        case '研发阶段':
            return 'bg-pink-100 text-pink-800';
        case '大规模':
            return 'bg-teal-100 text-teal-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
}

function populatePartnersTable() {
    const partnersData = [
        { 
            category: "电解槽制造商", 
            company: "Linde plc", 
            relevance: "AEL/PEM电解槽，大规模生产",
            priority: "高"
        },
        { 
            category: "电解槽制造商", 
            company: "ThyssenKrupp Nucera", 
            relevance: "AEL电解槽（主要企业）",
            priority: "非常高"
        },
        { 
            category: "电解槽制造商", 
            company: "Siemens Energy", 
            relevance: "PEM电解槽",
            priority: "高"
        },
        { 
            category: "电解槽制造商", 
            company: "Enapter AG", 
            relevance: "AEM电解槽（使用镍）",
            priority: "中等"
        },
        { 
            category: "电解槽制造商", 
            company: "NEL ASA", 
            relevance: "AEL和PEM电解槽",
            priority: "非常高"
        },
        { 
            category: "燃料电池制造商", 
            company: "AFC Energy", 
            relevance: "碱性燃料电池（镍电极/网）",
            priority: "高"
        },
        { 
            category: "燃料电池制造商", 
            company: "Ballard Power System Inc.", 
            relevance: "PEM燃料电池（堆栈连接用母线）",
            priority: "中等"
        },
        { 
            category: "材料与部件", 
            company: "HydroSolid", 
            relevance: "用于氢气存储的镍部件研发",
            priority: "中等"
        },
        { 
            category: "材料与部件", 
            company: "Greenerity", 
            relevance: "镍网与膜/催化剂的集成",
            priority: "高"
        },
        { 
            category: "系统集成商", 
            company: "Engie SA", 
            relevance: "大型项目，可再生能源集成",
            priority: "中等"
        },
    ];
    
    const tableBody = document.getElementById('partners-table');
    
    partnersData.forEach(partner => {
        const row = document.createElement('tr');
        row.classList.add('border-b', 'hover:bg-gray-50');
        
        row.innerHTML = `
            <td class="py-3 px-4 font-medium">${partner.category}</td>
            <td class="py-3 px-4">${partner.company}</td>
            <td class="py-3 px-4">${partner.relevance}</td>
            <td class="py-3 px-4">
                <span class="inline-flex rounded-full ${getPriorityColor(partner.priority)} text-xs font-medium px-2.5 py-0.5">
                    ${partner.priority}
                </span>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

function getPriorityColor(priority) {
    switch(priority) {
        case '非常高':
            return 'bg-red-100 text-red-800';
        case '高':
            return 'bg-orange-100 text-orange-800';
        case '中等':
            return 'bg-yellow-100 text-yellow-800';
        case '低':
            return 'bg-gray-100 text-gray-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
}
