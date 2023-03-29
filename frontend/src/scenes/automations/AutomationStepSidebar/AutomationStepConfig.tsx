import { LemonButton, LemonCollapse, LemonDivider, LemonInput, LemonLabel, LemonTextArea } from '@posthog/lemon-ui'
import { useActions, useValues } from 'kea'
import { PropertyFilters } from 'lib/components/PropertyFilters/PropertyFilters'
import { TaxonomicFilterGroupType } from 'lib/components/TaxonomicFilter/types'
import { Field, PureField } from 'lib/forms/Field'
import { JSONEditorInput } from 'scenes/feature-flags/JSONEditorInput'
import { ActionFilter } from 'scenes/insights/filters/ActionFilter/ActionFilter'
import { MathAvailability } from 'scenes/insights/filters/ActionFilter/ActionFilterRow/ActionFilterRow'
import { FilterType, InsightType } from '~/types'
import { automationLogic } from '../automationLogic'
import './AutomationStepConfig.scss'
import { automationStepConfigLogic } from './automationStepConfigLogic'

export function EventSentConfig(): JSX.Element {
    const { activeStep } = useValues(automationStepConfigLogic)
    const { updateActiveStep } = useActions(automationStepConfigLogic)

    return (
        <div className="mb-6">
            <div className="mb-2">
                <LemonLabel showOptional>Event filtering</LemonLabel>
                {/* <p className="text-sm text-muted">{variable.description}</p> */}
            </div>
            <div>
                <ActionFilter
                    filters={{
                        insight: InsightType.TRENDS,
                        events: activeStep.filters,
                        new_entity: activeStep.new_entity,
                    }}
                    setFilters={(filters: FilterType) => {
                        updateActiveStep(activeStep.id, { filters: filters.events, new_entity: filters.new_entity })
                    }}
                    typeKey={'automation_step_event_sent_config'}
                    buttonCopy={'Action or event filter'}
                    mathAvailability={MathAvailability.None}
                />
            </div>
            {/* TODO: add this back to enable CDP use case of filtering all properties */}
            {/* <div className="mb-2">
                <LemonLabel showOptional>Event properties</LemonLabel>
            </div>
            <div>
                <PropertyFilters
                    propertyFilters={[]}
                    onChange={() => {}}
                    pageKey={'pageKey'}
                    style={{ marginBottom: 0 }}
                    showNestedArrow
                    eventNames={[]}
                    taxonomicGroupTypes={[TaxonomicFilterGroupType.EventProperties]}
                />
            </div> */}
            <div className="mb-2">
                <LemonLabel showOptional>Person and cohort</LemonLabel>
                {/* <p className="text-sm text-muted">{variable.description}</p> */}
            </div>
            <div>
                <PropertyFilters
                    propertyFilters={[]}
                    onChange={() => {}}
                    pageKey={'pageKey'}
                    style={{ marginBottom: 0 }}
                    showNestedArrow
                    eventNames={[]}
                    taxonomicGroupTypes={[TaxonomicFilterGroupType.PersonProperties, TaxonomicFilterGroupType.Cohorts]}
                />
            </div>
        </div>
    )
}

export function WebhookDestinationConfig(): JSX.Element {
    const { activeStep, activeStepConfig, exampleEvent, previewPayload } = useValues(automationStepConfigLogic)
    const { updateActiveStep, setExampleEvent } = useActions(automationStepConfigLogic)
    return (
        <>
            {/* <PureField label={'Destination url'}>
                <LemonInput
                    placeholder="Optional descriptive placeholder text"
                    value={activeStep.url}
                    onChange={(url) => {
                        updateActiveStep(activeStep.id, { url })
                    }}
                />
            </PureField> */}
            <div className="mt-4" />
            <PureField label={'Payload'} className="max-w-160">
                <JSONEditorInput
                    defaultNumberOfLines={4}
                    value={activeStep.payload}
                    onChange={(payload) => {
                        updateActiveStep(activeStep.id, { payload })
                    }}
                />
            </PureField>
            <div className="mt-4" />
            <PureField label={'Preview'} className="max-w-160">
                <JSONEditorInput defaultNumberOfLines={4} value={JSON.stringify(previewPayload, null, 4)} readOnly />
                <LemonCollapse
                    panels={[
                        {
                            key: '1',
                            header: <span>Example event</span>,
                            content: (
                                <JSONEditorInput
                                    defaultNumberOfLines={4}
                                    value={exampleEvent}
                                    onChange={(val) => {
                                        setExampleEvent(val)
                                    }}
                                />
                            ),
                        },
                    ]}
                />
            </PureField>
            <div className="mt-4" />
        </>
    )
}

export function AutomationStepConfig(): JSX.Element {
    const { activeStep, activeStepConfig } = useValues(automationStepConfigLogic)
    const { addStep } = useActions(automationLogic)
    if (!activeStep) {
        return <h2>Error loading step</h2>
    }
    return (
        <>
            <h2>New step: {activeStepConfig.label}</h2>
            <LemonDivider />
            {activeStepConfig.configComponent}
            <LemonButton
                type="primary"
                onClick={() => {
                    console.debug('Saving', activeStep)
                    addStep(activeStep)
                }}
            >
                Save
            </LemonButton>
        </>
    )
}
