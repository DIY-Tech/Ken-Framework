<?php

class AccountModel {
    public static function create($filtload) {
        // optional field
        $dynamicField = "";
        // optional value
        $dynamicValue = "";
        if(isset($filtload['accountDiscount'])) {
            $dynamicField .= ", accountDiscount";
            $dynamicValue .= ", :accountDiscount";
        }

        return Dispatcher::dispatch(
            "INSERT INTO account
            (accountEmail, accountPassword $dynamicField)
            VALUES
            (:accountEmail, :accountPasswordHash $dynamicValue)",
            $filtload,
            ['returnId' => TRUE]
        );
    }

    public static function getAccountByEmail($filtLoad) {
        return Dispatcher::dispatch(
            "SELECT * FROM account WHERE accountEmail = :accountEmail",
            $filtLoad,
            ['fetchConstant' => 'fetch']
        );
    }

    public static function getAccountById($filtLoad) {
        return Dispatcher::dispatch(
            "SELECT 
            accountEmail, accountType, accountCreated, accountDiscount, accountId 
            FROM account WHERE accountId = :accountId",
            $filtLoad,
            ['fetchConstant' => 'fetch']
        );
    }

    public static function delete($filtLoad) {
        return Dispatcher::dispatch(
            "DELETE FROM account WHERE accountId = :accountId",
            $filtLoad
        );
    }

    public static function getAll($filtLoad) {
        return Dispatcher::dispatch(
            "SELECT
            accountEmail, accountType, accountCreated, accountDiscount, accountId
            From account",
            $filtLoad,
            ['fetchConstant' => 'fetchAll']
        );
    }
    public static function getOne($filtLoad) {
        return Dispatcher::dispatch(
            "SELECT
            accountEmail, accountType, accountCreated, accountDiscount, accountId
            From account
            WHERE accountId = :accountId",
            $filtLoad,
            ['fetchConstant' => 'fetch']
        );
    }

    public static function update($filtLoad) {
        $dynamicField = "";
        if(isset($filtLoad['accountEmail'])) {
            $dynamicField .= "accountEmail = :accountEmail,";
        }

        if(isset($filtLoad['accountPasswordHash'])) {
            $dynamicField .= "accountPassword = :accountPasswordHash,";
        }

        if(isset($filtLoad['accountDiscount'])) {
            $dynamicField .= "accountDiscount = :accountDiscount";
        }

        // This piece of code is needed to remove any 
        // end of line comments that might be their
        // due to the nature of optional parameters
        $dynamicField = rtrim($dynamicField, ",");

        return Dispatcher::dispatch(
            "UPDATE account
            SET $dynamicField
            WHERE accountId = :accountId",
            $filtLoad
        );
    }
}