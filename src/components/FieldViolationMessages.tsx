import React, {useMemo} from 'react';
import {View} from 'react-native';
import useLocalize from '@hooks/useLocalize';
import ViolationsUtils from '@libs/Violations/ViolationsUtils';
import useThemeStyles from '@styles/useThemeStyles';
import {TransactionViolation} from '@src/types/onyx';
import Text from './Text';

export default function FieldViolationMessages({violations}: {violations: TransactionViolation[]}) {
    const styles = useThemeStyles();

    const localize = useLocalize();
    const translate = localize.translate;

    const violationMessages = useMemo(() => violations.map((violation) => [violation.name, ViolationsUtils.getViolationTranslation(violation, translate)]), [translate, violations]);

    return (
        <>
            {violationMessages.map(([name, message]) => (
                <View key={`violationMessages.${name}`}>
                    <Text style={[styles.ph5, styles.textLabelError]}>{message}</Text>
                </View>
            ))}
        </>
    );
}
