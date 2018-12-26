import listdata from "./listdata";

const copd = require.context(
    "dataimg/copd",
    true,
    /^\.\/.*\.(?:png|jpg|gif|bmp)$/
); //引入所有图片
const copdreqlib = {};
copd.keys().map((currentValue, index, arr) => {
    copdreqlib[currentValue.split("/")[1].split(".")[0]] = copd(
        currentValue,
        index,
        arr
    );
}); //生成图片合集;

const asthma = require.context(
    "dataimg/asthma",
    true,
    /^\.\/.*\.(?:png|jpg|gif|bmp)$/
); //引入所有图片
const asthmareqlib = {};
asthma.keys().map((currentValue, index, arr) => {
    asthmareqlib[currentValue.split("/")[1].split(".")[0]] = asthma(
        currentValue,
        index,
        arr
    );
}); //生成图片合集;

const gso = require.context(
    "dataimg/gso",
    true,
    /^\.\/.*\.(?:png|jpg|gif|bmp)$/
); //引入所有图片
const gsoreqlib = {};
gso.keys().map((currentValue, index, arr) => {
    gsoreqlib[currentValue.split("/")[1].split(".")[0]] = gso(
        currentValue,
        index,
        arr
    );
}); //生成图片合集;

const dbName = "APPDB";
const dbVersion = 1;
const webapi = {
    createWebSql: () => {
        window.indexedDB.deleteDatabase(dbName);
        // 打开数据库
        let DBOpenRequest = window.indexedDB.open(dbName, dbVersion);
        // 数据库打开成功后
        DBOpenRequest.onsuccess = function (event) {
            // 存储数据结果
            let db = DBOpenRequest.result;
            // 做其他事情...
        };
        DBOpenRequest.onupgradeneeded = function (event) {
            //添加内容表数据
            //asthma
            let detialData = [];
            for (const key in asthmareqlib) {
                let keysplit = key.split("&");
                detialData.push({
                    id: "asthma" + keysplit[1],
                    belonged: "asthma",
                    type: keysplit[0],
                    tabgroup: keysplit[2] ? keysplit[2] : null,
                    name: key,
                    url: asthmareqlib[key]
                });
            }
            //copd
            for (const key in copdreqlib) {
                let keysplit = key.split("&");
                detialData.push({
                    id: "copd" + keysplit[1],
                    belonged: "copd",
                    type: keysplit[0],
                    tabgroup: keysplit[2] ? keysplit[2] : null,
                    name: key,
                    url: copdreqlib[key]
                });
            }
            //gso
            for (const key in gsoreqlib) {
                let keysplit = key.split("&");
                detialData.push({
                    id: "gso" + keysplit[1],
                    belonged: "gso",
                    type: keysplit[0],
                    tabgroup: keysplit[2] ? keysplit[2] : null,
                    name: key,
                    url: gsoreqlib[key]
                });
            }

            //数组化tabgroup
            let tabGroupData = [];
            //数组化数据
            tabGroupData.push({
                id: 3,
                title: "舒利迭®哮喘治疗领域关键临床研究",
                tablist: [{
                        id: "2-7",
                        value: "GOAL研究"
                    },
                    {
                        id: "2-8",
                        value: "EXCEL研究"
                    },
                    {
                        id: "2-9",
                        value: "CONCEPT研究"
                    },
                    {
                        id: "2-10",
                        value: "LundBack 3年研究"
                    }
                ]
            });
            tabGroupData.push({
                id: 4,
                title: "舒利迭®哮喘治疗领域关键临床研究",
                tablist: [{
                        id: "4-2",
                        value: "COSMOS研究"
                    },
                    {
                        id: "4-3",
                        value: "COMPASS研究"
                    },
                    {
                        id: "4-4",
                        value: "EuroSMART研究"
                    },
                    {
                        id: "4-5",
                        value: "SYGMA研究"
                    }
                ]
            });
            tabGroupData.push({
                id: 5,
                title: "舒利迭®关键产品安全性信息",
                tablist: [{
                        id: "6-6",
                        value: "粉吸入剂50/100、50/200 "
                    },
                    {
                        id: "6-7",
                        value: "粉吸入剂50/500"
                    },
                    {
                        id: "6-8",
                        value: "气雾剂"
                    }
                ]
            });
            tabGroupData.push({
                id: 6,
                title: "哮喘控制的调查问卷",
                tablist: [{
                        id: "6-1",
                        value: "ACT"
                    },
                    {
                        id: "6-2",
                        value: "ACQ和ACQ-5 "
                    },
                    {
                        id: "6-3",
                        value: "AQLQ"
                    },
                    // {
                    //     id: "6-4",
                    //     value: "ATAQ"
                    // }
                ]
            });
            
            tabGroupData.push({
                id: 1,
                title: "舒利迭®慢阻肺治疗领域关键临床研究",
                tablist: [{
                        id: "2-5",
                        value: "BIOPSY研究"
                    },
                    {
                        id: "2-6",
                        value: "Kardos P研究"
                    },
                    {
                        id: "2-7",
                        value: "TORCH研究"
                    },
                    {
                        id: "2-8",
                        value: "中国注册临床研究"
                    },
                    {
                        id: "2-9",
                        value: "INSPIRE研究"
                    },
                    {
                        id: "2-10",
                        value: "TRISTAN研究"
                    },
                    {
                        id: "2-11",
                        value: "TORCH事后分析"
                    }
                ]
            });

            tabGroupData.push({
                id: 2,
                title: "竞品关键研究",
                tablist: [{
                        id: "4-2",
                        value: "PATHOS研究"
                    },
                    {
                        id: "4-3",
                        value: "SPEED研究"
                    },
                    {
                        id: "4-4",
                        value: "FLAME研究"
                    }
                ]
            });
            tabGroupData.push({
                id: 8,
                title: "3.	GSO Check List",
                tablist: [{
                    id: "2-3",
                    value: "3.	GSO Check List"
                }, ]
            });
            tabGroupData.push({
                id: 9,
                title: "目标医生：B类客户|关键信息：舒利迭可以让~80%患者达到真正的哮喘控制。",
                tablist: [{
                        id: "3-1",
                        value: "较轻未控制"
                    },
                    {
                        id: "3-2",
                        value: "较重未控制"
                    },
                    {
                        id: "3-3",
                        value: "持续性咳嗽未控制"
                    }
                ]
            });
            tabGroupData.push({
                id: 10,
                title: "目标医生：B类客户|关键信息：舒利迭显著降低慢阻肺高风险患者急性加重风险25%。",
                tablist: [{
                        id: "1-4",
                        value: "有多次急性加重史或者一次急性加重住院史"
                    },
                    {
                        id: "1-5",
                        value: "有过急性加重史，但主诉只强调症状多"
                    },
                ]
            });
            tabGroupData.push({
                id: 7,
                title: "I：CAT评估方法简介",
                tablist: [{
                    id: "6-1",
                    value: "I：CAT评估方法简介"
                }, ]
            });

            //创建章节内容
            let sectionData = [];
            let listData = [];
            //asthma内容
            for (let z = 0; z < listdata.asthma.length; z++) {
                listData.push({
                    id: z,
                    belonged: "asthma",
                    catalog: listdata.asthma[z].catalog,
                    value: listdata.asthma[z].value
                })
                for (let x = 0; x < listdata.asthma[z].list.length; x++) {
                    sectionData.push({
                        id: "asthamasection" + z + "-" + x,
                        father: "asthma",
                        belonged: z,
                        value: listdata.asthma[z].list[x].title,
                        to: listdata.asthma[z].list[x].to
                    })
                }
            }
            //copd内容
            for (let z = 0; z < listdata.copd.length; z++) {
                listData.push({
                    id: z,
                    belonged: "copd",
                    catalog: listdata.copd[z].catalog,
                    value: listdata.copd[z].value
                })
                for (let x = 0; x < listdata.copd[z].list.length; x++) {
                    sectionData.push({
                        id: "copdsection" + z + "-" + x,
                        father: "copd",
                        belonged: z,
                        value: listdata.copd[z].list[x].title,
                        to: listdata.copd[z].list[x].to
                    })
                }
            }
            //gso内容

            for (let z = 0; z < listdata.gso.length; z++) {
                listData.push({
                    id: z,
                    belonged: "gso",
                    catalog: listdata.gso[z].catalog,
                    value: listdata.gso[z].value
                })
                for (let x = 0; x < listdata.gso[z].list.length; x++) {
                    sectionData.push({
                        id: "gsosection" + z + "-" + x,
                        father: "gso",
                        belonged: z,
                        value: listdata.gso[z].list[x].title,
                        to: listdata.gso[z].list[x].to
                    })
                }
            }
            window.localStorage.detialData = JSON.stringify(detialData);
            window.localStorage.tabGroupData = JSON.stringify(tabGroupData);
            window.localStorage.listData = JSON.stringify(listData);
            window.localStorage.sectionData = JSON.stringify(sectionData);
            // console.log(detialData,tabGroupData,listData,sectionData);
        };
    },
    getListInfo(id, callback) {
        let result = [];
        if(!window.localStorage.listData) return
            
        let listdata = JSON.parse(window.localStorage.listData);
        for (let z = 0; z < listdata.length; z++) {
            if (listdata[z].belonged == id) {
                let _data = listdata[z];
                result.push(_data);
            }
        }
        callback(result);
        // let result = [];
        // let DBOpenRequest = window.indexedDB.open(dbName, dbVersion);
        // // 数据库打开成功后
        // let self = this;
        // DBOpenRequest.onsuccess = function (event) {
        //     // 存储数据结果
        //     let db = DBOpenRequest.result;
        //     // 做其他事情...
        //     let objectStore = db.transaction("ListData").objectStore("ListData");
        //     objectStore.openCursor().onsuccess = function (event) {
        //         let cursor = event.target.result;
        //         if (cursor) {
        //             // cursor.value就是数据对象
        //             // 游标没有遍历完，继续
        //             if (cursor.value.belonged == id) {
        //                 let _data = cursor.value;
        //                 result.push(_data);
        //             }
        //             cursor.continue();
        //         } else {
        //             // 如果全部遍历完毕...
        //             callback(result);
        //         }
        //     };
        // };
    },
    getSectionInfo(father, fatherid, callback) {
        let result = [];
        if(!window.localStorage.sectionData) return;
        let sectiondata = JSON.parse(window.localStorage.sectionData);
        for (let z = 0; z < sectiondata.length; z++) {
            if (
                sectiondata[z].belonged == fatherid &&
                sectiondata[z].father == father
            ) {
                let _data = sectiondata[z];
                result.push(_data);
            }
        }
        callback(result);
        // let DBOpenRequest = window.indexedDB.open(dbName, dbVersion);
        // // 数据库打开成功后
        // let self = this;
        // DBOpenRequest.onsuccess = await

        // function (event) {
        //     // 存储数据结果
        //     let db = DBOpenRequest.result;
        //     // 做其他事情...
        //     let objectStore = db
        //         .transaction("SectionData")
        //         .objectStore("SectionData");
        //     objectStore.openCursor().onsuccess = function (event) {
        //         let cursor = event.target.result;
        //         if (cursor) {
        //             // cursor.value就是数据对象
        //             // 游标没有遍历完，继续
        //             if (
        //                 cursor.value.belonged == fatherid &&
        //                 cursor.value.father == father
        //             ) {
        //                 let _data = cursor.value;
        //                 result.push(_data);
        //             }
        //             cursor.continue();
        //         } else {
        //             // 如果全部遍历完毕...
        //             callback(result);
        //         }
        //     };
        // };
    },
    getDetialInfo(belongedfather, poslist, possection, callback) {
        let result = [];

        let detialdata = JSON.parse(window.localStorage.detialData);
        for (let z = 0; z < detialdata.length; z++) {
            if (
                detialdata[z].id ==
                belongedfather + "" + poslist + "-" + possection
            ) {
                let _data = detialdata[z];
                result.push(_data);
            }
        }
        callback(result)
        // let DBOpenRequest = window.indexedDB.open(dbName, dbVersion);
        // // 数据库打开成功后
        // let self = this;
        // DBOpenRequest.onsuccess = function (event) {
        //     // 存储数据结果
        //     let db = DBOpenRequest.result;
        //     // 做其他事情...
        //     let objectStore = db.transaction("DetialData").objectStore("DetialData");
        //     objectStore.openCursor().onsuccess = function (event) {
        //         let cursor = event.target.result;
        //         if (cursor) {
        //             if (
        //                 cursor.value.id ==
        //                 belongedfather + "" + poslist + "-" + possection
        //             ) {
        //                 let _data = cursor.value;
        //                 result.push(_data);
        //             }
        //             cursor.continue();
        //         } else {
        //             callback(result);
        //         }
        //     };
        // };
    },
    getTabList(tabid, callback) {
        let result = [];

        let tabgroupdata = JSON.parse(window.localStorage.tabGroupData);

        for (let z = 0; z < tabgroupdata.length; z++) {
            if (tabgroupdata[z].id == tabid) {
                result.push(tabgroupdata[z]);
            }
        }
        callback(result)
        // let DBOpenRequest = window.indexedDB.open(dbName, dbVersion);
        // // 数据库打开成功后
        // let self = this;
        // DBOpenRequest.onsuccess = function (event) {
        //     // 存储数据结果
        //     let db = DBOpenRequest.result;
        //     // 做其他事情...
        //     let objectStore = db
        //         .transaction("TabGroupData")
        //         .objectStore("TabGroupData");
        //     objectStore.openCursor().onsuccess = function (event) {
        //         let cursor = event.target.result;
        //         if (cursor) {
        //             if (cursor.value.id == tabid) {
        //                 result.push(cursor.value);
        //             }
        //             cursor.continue();
        //         } else {
        //             callback(result);
        //         }
        //     };
        // };
    },
    getCollection(callback) {
        if (!window.localStorage.Collection) {
            window.localStorage.Collection = JSON.stringify([]);
        } else {
            let data = JSON.parse(window.localStorage.Collection);
            callback(data);
        }
        // let result = [];
        // let DBOpenRequest = window.indexedDB.open(dbName, dbVersion);
        // // 数据库打开成功后
        // let self = this;
        // DBOpenRequest.onsuccess =
        //     function (event) {
        //         // 存储数据结果
        //         let db = DBOpenRequest.result;
        //         // 做其他事情...
        //         let objectStore = db.transaction('Collection').objectStore('Collection');
        //         objectStore.openCursor().onsuccess = function (event) {
        //             let cursor = event.target.result;
        //             if (cursor) {
        //                 result.push(cursor.value)
        //                 cursor.continue();
        //             } else {
        //                 callback(result);
        //             }
        //         }
        //     };
    },
    savetoCollection(json, callback) {
        if (!window.localStorage.Collection) {
            let firstarray = [json];
            window.localStorage.Collection = JSON.stringify(firstarray);
        } else {
            let data = JSON.parse(window.localStorage.Collection);
            data.push(json);
            window.localStorage.Collection = JSON.stringify(data);
            callback();
        }
    },
    searchList(searchvalue, callback) {
        let result = [];

        let sectiondata = JSON.parse(window.localStorage.sectionData);
        for (let z = 0; z < sectiondata.length; z++) {
            let reg = new RegExp(searchvalue);
            if (sectiondata[z].value.match(reg)) {
                result.push(sectiondata[z]);
            }
        }
        callback(result);
        // let DBOpenRequest = window.indexedDB.open(dbName, dbVersion);
        // // 数据库打开成功后
        // let self = this;
        // DBOpenRequest.onsuccess = function (event) {
        //     // 存储数据结果
        //     let db = DBOpenRequest.result;
        //     // 做其他事情...
        //     let objectStore = db
        //         .transaction("SectionData")
        //         .objectStore("SectionData");
        //     objectStore.openCursor().onsuccess = function (event) {
        //         let cursor = event.target.result;
        //         if (cursor) {
        //             let reg = new RegExp(searchvalue);
        //             if (cursor.value.value.match(reg)) {
        //                 result.push(cursor.value);
        //             }
        //             cursor.continue();
        //         } else {
        //             callback(result);
        //         }
        //     };
        // };
    },
    setHistory(hash) {
        if (!window.localStorage.History) {
            let firstarray = [hash];
            window.localStorage.History = JSON.stringify(firstarray);
        } else {
            let data = JSON.parse(window.localStorage.History);
            data.push(hash);
            window.localStorage.History = JSON.stringify(data);
        }
    },
    getHistory(callback) {
        if (!window.localStorage.History) {
            window.localStorage.History = JSON.stringify([]);
        } else {
            let data = JSON.parse(window.localStorage.History);
            callback(data.reverse());
        }
    },
    getSectionName(father, belonged, to, callback) {
        let result = [];
        let sectiondata = JSON.parse(window.localStorage.sectionData);
        for (let z = 0; z < sectiondata.length; z++) {
            if (sectiondata[z].father == father && sectiondata[z].belonged == belonged && sectiondata[z].to == to) {
                result.push(sectiondata[z]);
            }
        }
        callback(result);
        // let DBOpenRequest = window.indexedDB.open(dbName, dbVersion);
        // // 数据库打开成功后
        // let self = this;
        // DBOpenRequest.onsuccess = function (event) {
        //     // 存储数据结果
        //     let db = DBOpenRequest.result;
        //     // 做其他事情...
        //     let objectStore = db
        //         .transaction("SectionData")
        //         .objectStore("SectionData");
        //     objectStore.openCursor().onsuccess = function (event) {
        //         let cursor = event.target.result;
        //         if (cursor) {
        //             if (cursor.value.father == father && cursor.value.belonged == belonged && cursor.value.to == to) {
        //                 result.push(cursor.value);
        //             }
        //             cursor.continue();
        //         } else {
        //             callback(result);
        //         }
        //     };
        // };
    },
    clearHistory(callback) {
        window.localStorage.History = JSON.stringify([]);
        callback();
    },
    setReadRate(id, rate, callback) {
        if (!window.localStorage.ReadRate) {
            let json = {};
            json[id] = rate;
            let firstarray = json;
            window.localStorage.ReadRate = JSON.stringify(firstarray);
        } else {
            let data = JSON.parse(window.localStorage.ReadRate);
            if (data[id] != undefined) {
                data[id] = data[id] < rate ? rate : data[id];
            } else {
                data[id] = rate;
            }
            window.localStorage.ReadRate = JSON.stringify(data);
            callback();
        }
    }
};
export default webapi;