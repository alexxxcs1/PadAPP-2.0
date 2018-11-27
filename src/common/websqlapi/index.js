import listdata from './listdata'

const copd = require.context("dataimg/copd", true, /^\.\/.*\.(?:png|jpg|gif|bmp)$/); //引入所有图片
const copdreqlib = {};
copd.keys().map((currentValue, index, arr) => {
    copdreqlib[currentValue.split("/")[1].split(".")[0]] = copd(
        currentValue,
        index,
        arr
    );
}); //生成图片合集;

const asthma = require.context("dataimg/asthma", true, /^\.\/.*\.(?:png|jpg|gif|bmp)$/); //引入所有图片
const asthmareqlib = {};
asthma.keys().map((currentValue, index, arr) => {
    asthmareqlib[currentValue.split("/")[1].split(".")[0]] = asthma(
        currentValue,
        index,
        arr
    );
}); //生成图片合集;


const dbName = 'APPDB';
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
            // 通常对主键，字段等进行重定义，具体参见demo
            var db = event.target.result;

            // 定义存储对象的数据项

            //收藏表
            var Collection = db.createObjectStore('Collection', {
                keyPath: 'id',
                autoIncrement: true
            });
            Collection.createIndex('id', 'id', {
                unique: true
            });
            Collection.createIndex('route', 'route');
            Collection.createIndex('value', 'value');

            //内容表
            let DetialData = db.createObjectStore('DetialData', {
                keyPath: 'id',
                autoIncrement: true
            });
            DetialData.createIndex('id', 'id', {
                unique: true
            });
            DetialData.createIndex('belonged', 'belonged');
            DetialData.createIndex('type', 'type');
            DetialData.createIndex('tabgroup', 'tabgroup');
            DetialData.createIndex('name', 'name');
            DetialData.createIndex('url', 'url');

            //添加内容表数据
            //asthma
            for (const key in asthmareqlib) {
                let keysplit = key.split('&');
                DetialData.add({
                    id: 'asthma' + keysplit[1],
                    belonged: 'asthma',
                    type: keysplit[0],
                    tabgroup: keysplit[2] ? keysplit[2] : null,
                    name: key,
                    url: asthmareqlib[key],
                });
            }
            //创建tabgroup表
            let TabGroupData = db.createObjectStore('TabGroupData', {
                keyPath: 'id',
                autoIncrement: true
            });
            TabGroupData.createIndex('id', 'id', {
                unique: true
            });
            TabGroupData.createIndex('title', 'title');
            TabGroupData.createIndex('tablist', 'tablist');
            TabGroupData.add({
                id: 1,
                title: '舒利迭®哮喘治疗领域关键临床研究',
                tablist: [{
                        id: '2-3',
                        value: 'GOAL研究'
                    },
                    {
                        id: '2-4',
                        value: 'EXCEL研究'
                    },
                    {
                        id: '2-5',
                        value: 'CONCEPT研究'
                    }, {
                        id: '2-6',
                        value: 'LundBack 3年研究'
                    }
                ]
            });
            TabGroupData.add({
                id: 2,
                title: '舒利迭®哮喘治疗领域关键临床研究',
                tablist: [{
                        id: '4-2',
                        value: 'COSMOS研究'
                    },
                    {
                        id: '4-3',
                        value: 'COMPASS研究'
                    },
                    {
                        id: '4-4',
                        value: 'EuroSMART研究'
                    }, {
                        id: '4-5',
                        value: 'SYGMA研究'
                    }
                ]
            });
            TabGroupData.add({
                id: 3,
                title: '哮喘控制的调查问卷',
                tablist: [{
                        id: '6-1',
                        value: 'ACT'
                    },
                    {
                        id: '6-2',
                        value: 'ACQ和ACQ-5 '
                    },
                    {
                        id: '6-3',
                        value: 'AQLQ'
                    }, {
                        id: '6-4',
                        value: 'ATAQ'
                    }
                ]
            });
            TabGroupData.add({
                id: 4,
                title: '舒利迭®关键产品安全性信息',
                tablist: [{
                        id: '6-7',
                        value: '粉吸入剂50/100、50/200 '
                    },
                    {
                        id: '6-8',
                        value: '粉吸入剂50/500'
                    },
                    {
                        id: '6-9',
                        value: '气雾剂'
                    }
                ]
            });
            TabGroupData.add({
                id: 5,
                title: '舒利迭®慢阻肺治疗领域关键临床研究',
                tablist: [{
                        id: '2-4',
                        value: 'BIOPSY研究'
                    },
                    {
                        id: '2-5',
                        value: 'TRISTAN研究'
                    },
                    {
                        id: '2-6',
                        value: 'TORCH研究'
                    },
                    {
                        id: '2-7',
                        value: '中国注册临床研究'
                    },
                    {
                        id: '2-8',
                        value: 'INSPIRE研究'
                    },
                    {
                        id: '2-9',
                        value: 'TORCH事后分析'
                    }
                ]
            });
            TabGroupData.add({
                id: 6,
                title: '2. 信必可®关键研究解读',
                tablist: [{
                        id: '4-2',
                        value: 'PATHOS研究'
                    },
                    {
                        id: '4-3',
                        value: 'SPEED研究'
                    }
                ]
            });
            //copd
            for (const key in copdreqlib) {
                let keysplit = key.split('&');
                DetialData.add({
                    id: 'copd' + keysplit[1],
                    belonged: 'copd',
                    type: keysplit[0],
                    tabgroup: keysplit[2] ? keysplit[2] : null,
                    name: key,
                    url: copdreqlib[key],
                });
            }

            //章节表
            let ListData = db.createObjectStore('ListData', {
                keyPath: 'lid',
                autoIncrement: true
            });
            ListData.createIndex('id', 'id');
            ListData.createIndex('belonged', 'belonged');
            ListData.createIndex('catalog', 'catalog');
            ListData.createIndex('value', 'value');

            //小节表
            let SectionData = db.createObjectStore('SectionData', {
                keyPath: 'id',
                autoIncrement: true
            });
            SectionData.createIndex('id', 'id', {
                unique: true
            });
            SectionData.createIndex('father', 'father');
            SectionData.createIndex('belonged', 'belonged');
            SectionData.createIndex('value', 'value');
            SectionData.createIndex('to', 'to');

            //创建章节内容
            //asthma内容
            for (let z = 0; z < listdata.asthma.length; z++) {
                ListData.add({
                    id: z,
                    belonged: 'asthma',
                    catalog: listdata.asthma[z].catalog,
                    value: listdata.asthma[z].value,
                })
                for (let x = 0; x < listdata.asthma[z].list.length; x++) {
                    SectionData.add({
                        id: 'asthamasection' + z + '-' + x,
                        father: 'asthma',
                        belonged: z,
                        value: listdata.asthma[z].list[x].title,
                        to: listdata.asthma[z].list[x].to
                    });
                }
            }
            //copd内容
            for (let z = 0; z < listdata.copd.length; z++) {
                ListData.add({
                    id: z,
                    belonged: 'copd',
                    catalog: listdata.copd[z].catalog,
                    value: listdata.copd[z].value,
                })
                for (let x = 0; x < listdata.copd[z].list.length; x++) {
                    SectionData.add({
                        id: 'copdsection' + z + '-' + x,
                        father: 'copd',
                        belonged: z,
                        value: listdata.copd[z].list[x].title,
                        to: listdata.copd[z].list[x].to
                    });
                }
            }

        };
    },
    async getListInfo(id, callback) {
        let result = [];
        let DBOpenRequest = window.indexedDB.open(dbName, dbVersion);
        // 数据库打开成功后
        let self = this;
        DBOpenRequest.onsuccess = function (event) {
            // 存储数据结果
            let db = DBOpenRequest.result;
            // 做其他事情...
            let objectStore = db.transaction('ListData').objectStore('ListData');
            objectStore.openCursor().onsuccess = function (event) {
                let cursor = event.target.result;
                if (cursor) {
                    // cursor.value就是数据对象
                    // 游标没有遍历完，继续
                    if (cursor.value.belonged == id) {
                        let _data = cursor.value;
                        result.push(_data);
                    }
                    cursor.continue();
                } else {
                    // 如果全部遍历完毕...
                    callback(result);
                }
            }
        };
    },
    async getSectionInfo(father, fatherid, callback) {
        let result = [];
        let DBOpenRequest = window.indexedDB.open(dbName, dbVersion);
        // 数据库打开成功后
        let self = this;
        DBOpenRequest.onsuccess = await

        function (event) {
            // 存储数据结果
            let db = DBOpenRequest.result;
            // 做其他事情...
            let objectStore = db.transaction('SectionData').objectStore('SectionData');
            objectStore.openCursor().onsuccess = function (event) {
                let cursor = event.target.result;
                if (cursor) {
                    // cursor.value就是数据对象
                    // 游标没有遍历完，继续
                    if (cursor.value.belonged == fatherid && cursor.value.father == father) {
                        let _data = cursor.value;
                        result.push(_data);
                    }
                    cursor.continue();
                } else {
                    // 如果全部遍历完毕...
                    callback(result);
                }
            }
        };
    },
    getDetialInfo(belongedfather, poslist, possection, callback) {
        let result = [];
        let DBOpenRequest = window.indexedDB.open(dbName, dbVersion);
        // 数据库打开成功后
        let self = this;
        DBOpenRequest.onsuccess =
            function (event) {
                // 存储数据结果
                let db = DBOpenRequest.result;
                // 做其他事情...
                let objectStore = db.transaction('DetialData').objectStore('DetialData');
                objectStore.openCursor().onsuccess = function (event) {
                    let cursor = event.target.result;
                    if (cursor) {
                        if (cursor.value.id == belongedfather + '' + poslist + '-' + possection) {
                            let _data = cursor.value;
                            result.push(_data);
                        }
                        cursor.continue();
                    } else {
                        callback(result);
                    }
                }
            };
    },
    getTabList(tabid, callback) {
        let result = [];
        let DBOpenRequest = window.indexedDB.open(dbName, dbVersion);
        // 数据库打开成功后
        let self = this;
        DBOpenRequest.onsuccess =
            function (event) {
                // 存储数据结果
                let db = DBOpenRequest.result;
                // 做其他事情...
                let objectStore = db.transaction('TabGroupData').objectStore('TabGroupData');
                objectStore.openCursor().onsuccess = function (event) {
                    let cursor = event.target.result;
                    if (cursor) {
                        if (cursor.value.id == tabid) {
                            result.push(cursor.value)
                        }
                        cursor.continue();
                    } else {
                        callback(result);
                    }
                }
            };
    },
    getCollection(callback) {
        if (!window.localStorage.Collection) {
            window.localStorage.Collection = JSON.stringify([]); 
        }else{
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
        }else{
            let data = JSON.parse(window.localStorage.Collection);
            data.push(json);
            window.localStorage.Collection = JSON.stringify(data);
            callback();
        }
        // let DBOpenRequest = window.indexedDB.open(dbName, dbVersion);
        // // 数据库打开成功后
        // let self = this;
        // DBOpenRequest.onsuccess =
        //     function (event) {
        //         // 存储数据结果
        //         let db = DBOpenRequest.result;
        //         // 做其他事情...
        //         let Collection = db.transaction('Collection', 'readwrite').objectStore('Collection');
        //         Collection.add(json);
        //         callback();
        //     };
    }
}
export default webapi;