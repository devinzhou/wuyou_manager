<template>
    <div class="root-view">

        <el-form :inline="true" class="form-inline">
            <el-form-item label="主题:">
                <el-select v-model="themeData.currentTheme" placeholder="请选择主题" @change="onActionChangeTheme($event)">
                    <el-option
                            style="color:#606266;font-weight:normal;"
                            v-for="item in themeData.themeList"
                            :key="item.id"
                            :label="item.title"
                            :value="item">
                    </el-option>
                </el-select>
        </el-form-item>
        </el-form>
        <div class="page-bar">
            <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    layout="prev, pager, next"
                    :total="1000">
            </el-pagination>
        </div>
        <el-table :data="list"
                style="width: 90%; padding: 5%">
            <el-table-column
                    prop="userName"
                    label="评论用户名"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="commentInfo"
                    label="评论内容"
                    width="250">
            </el-table-column>
            <el-table-column
                    prop="selected"
                    width="150"
                    label="是否加精">
                <template scope="scope">
                    <div v-if="scope.row.selected">是</div>
                    <div v-else>否</div>
                </template>
            </el-table-column>
            <el-table-column
                    prop="selected"
                    width="150"
                    label="操作">
                <template scope="scope">
                    <div v-if="scope.row.selected"><el-button  @click="onActionDealAddSpecial(scope.row, $event)">取消加精</el-button></div>
                    <div v-else><el-button type="primary" @click="onActionDealAddSpecial(scope.row, $event)">加精</el-button></div>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
    export default {
        name: "component-manage-comment",
        data() {
            return {
                list: [

                ],
                themeData: {
                    currentTheme: undefined,
                    themeList: [

                    ]
                },
                currentPage: 1,
                pageSize: 20
            }
        },
        mounted() {
            let that = this;
            this.$http.post('https://www.wuyouzhidi.com/getAllThemeListPageNotTest', {
                "pageNumber":0,
                "pageSize":500,
            }).then((value) => {
                value = value.data;
                if (value && value.success) {
                    that.themeData.themeList = value.data.content;
                }
            }).then(() => {
                //fail
            });
        },
        methods: {
            onActionDealAddSpecial(data) {
                let that = this;
                this.$http.post('https://www.wuyouzhidi.com/selectThemeComment', {
                    "id":data.id,
                    "selected": !data.selected
                }).then((value) => {
                    value = value.data;
                    if (value && value.success) {
                        data.selected = !data.selected;
                    }
                }).then(() => {
                    //fail
                });
            },
            onActionChangeTheme(event) {
                this.triggerFetchData(event.id, true);
            },
            handleCurrentChange(event) {
                debugger;
                if (!this.themeData || !this.themeData.currentTheme ) {
                    return;
                }
                this.currentPage = event;


                this.triggerFetchData(this.themeData.currentTheme.id, false);
            },
            triggerFetchData(themeId, isRefresh) {
                if(isRefresh) {
                    this.currentPage = 0;
                }

                if (this.currentPage < 1) {
                    this.currentPage = 1;
                }

                    let that = this;

                let pageIndex = this.currentPage -1;

                this.$http.post('https://www.wuyouzhidi.com/getThemeCommentListAll', {
                    "pageNumber": pageIndex,
                    "pageSize": that.pageSize,
                    "themeId":themeId
                }).then((value) => {
                    value = value.data;
                    if (value && value.success) {
                        debugger;
                        let size = that.list.length;
                        for (let i= 0; i < size; i++) {
                            that.list.pop();
                        }

                        value.data.forEach((item) => {
                            that.list.push(item);
                        })
                    }
                }).then(() => {
                    //fail
                });
            }
        }
    }
</script>

<style scoped>
    .root-view {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .page-bar {
        width: 100%;
        margin: auto;
        display: flex;
        justify-content: center;
        padding-bottom: 20px;
    }
</style>