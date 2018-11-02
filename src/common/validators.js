export const getValidators = (column) => {
    let validators = [];
    if(!column || !column.view || column.hidden) {
      // return {currentValue: validators};
      return validators
    }
    let viewData = column.view.viewData;
    let renderData = column.view.renderData;
    let columnData = column.columnData;
    //必填校验
    if (column.isRequired) {
        validators.push("required");
    }
    // 长度校验
    if (parseInt(columnData.minLen) > 0 || parseInt(columnData.maxLen) > 0) {
        let min = parseInt(columnData.minLen);
        let max = parseInt(columnData.maxLen);
        let message = "";
        if (min && !max) {
            message = `至少${min}个字符`;
        } else if (!min && max) {
            message = `最长${max}个字符`;
        } else {
            message = `长度在 ${min} 到 ${max} 个字符`;
        }
        validators.push({
            test: eval(`/^.{${min},${max}}$/`),
            errorMsg: message
        })
    }

    // 金额字段校验
    if (column.isMoney) {
        validators.push({
            test: function (value) {
                if (!value || String(value).match(/^(\-?)\d+(\.\d+)?$/g) !== null) {
                    return true;
                } else {
                    return false;
                }
            },
            errorMsg: "数据格式有误"
        })
    };

    // 数字字段校验
    if (column.isNumber) {
        validators.push({
            test: function (value) {
                if (!value || !isNaN(Number(value))) {
                    return true;
                } else {
                    return false;
                }
            },
            errorMsg: "数据格式有误"
        })
    };

    // 唯一校验
    if (columnData.isUnique == 1) {
        validators.push({
            test: function (value) {
                if (!Boolean(value) || (column.isOtherModuleRelated && column.readonly)) {
                    return true;
                }
                axios.post("platform://custom/C12009", {
                    moduleId: viewData.moduleId,
                    columnName: columnData.phyColumnName,
                    recordId: column.view.recordId,
                    columnValue: value
                }).then(result => {
                    if (result.data === "NOTEXIST") {
                        return true;
                    } else {
                        return false;
                    }
                });
            },
            errorMsg: `${columnData.columnName}已存在`
        })
    }
    // beginDateColumnId
    if (columnData.beginDateColumnId && columnData.beginDateColumnId !== null) {
        validators.push({
            test: function (value) {
                let beginDateColumn = this.view.columnMap[
                    columnData.beginDateColumnId
                ];
                let beginDate = this.view.formModel[beginDateColumn.valKey];
                if (value >= beginDate) {
                    return true;
                } else {
                    return false;
                }
            },
            errorMsg: `${column.label}需要大于等于${beginDateColumn.label}`
        })
    }
    // 其他约束
    if (
        columnData.colConstraint &&
        columnData.colConstraint != -1 &&
        columnData.colConstraint != ""
    ) {
        for (var index in renderData.constraintList) {
            let constraint = renderData.constraintList[index];
            if (columnData.colConstraint == constraint.id) {
                validators.push({
                    test: function (value) {
                        if (!value || String(value).match(rule.expression) !== null) {
                            return true;
                        } else {
                            return false
                        }
                    },
                    errorMsg: constraint.promptContent
                })
            }
        }
    }
    // console.log('validators', validators)
    // return {currentValue: validators};
    return validators
}
