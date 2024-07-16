import { HogFunctionType } from '../../src/cdp/types'

/**
 * Hog functions are largely generated and built in the django service, making it tricky to test on this side.
 * As such we have a bunch of prebuilt examples here for usage in tests.
 */

export const HOG_EXAMPLES: Record<string, Pick<HogFunctionType, 'hog' | 'bytecode'>> = {
    simple_fetch: {
        hog: "let res := fetch(inputs.url, {\n  'headers': inputs.headers,\n  'body': inputs.body,\n  'method': inputs.method\n});\n\nprint('Fetch response:', res)",
        bytecode: [
            '_h',
            32,
            'headers',
            32,
            'headers',
            32,
            'inputs',
            1,
            2,
            32,
            'body',
            32,
            'body',
            32,
            'inputs',
            1,
            2,
            32,
            'method',
            32,
            'method',
            32,
            'inputs',
            1,
            2,
            42,
            3,
            32,
            'url',
            32,
            'inputs',
            1,
            2,
            2,
            'fetch',
            2,
            36,
            0,
            32,
            'Fetch response:',
            2,
            'print',
            2,
            35,
            35,
        ],
    },
    recursive_fetch: {
        hog: "for (let i := 0; i < 10; i := i + 1) {\n  fetch(inputs.url, {\n    'headers': inputs.headers,\n    'body': inputs.body,\n    'method': inputs.method\n  });\n}",
        bytecode: [
            '_h',
            33,
            0,
            33,
            10,
            36,
            0,
            15,
            40,
            45,
            32,
            'headers',
            32,
            'headers',
            32,
            'inputs',
            1,
            2,
            32,
            'body',
            32,
            'body',
            32,
            'inputs',
            1,
            2,
            32,
            'method',
            32,
            'method',
            32,
            'inputs',
            1,
            2,
            42,
            3,
            32,
            'url',
            32,
            'inputs',
            1,
            2,
            2,
            'fetch',
            2,
            35,
            33,
            1,
            36,
            0,
            6,
            37,
            0,
            39,
            -52,
            35,
        ],
    },
    malicious_function: {
        hog: "fn fibonacci(number) {\n    print('I AM FIBONACCI')\n    if (number < 2) {\n        return number;\n    } else {\n        return fibonacci(number - 1) + fibonacci(number - 2);\n    }\n}\nprint(f'fib {fibonacci(30)}');",
        bytecode: [
            '_h',
            41,
            'fibonacci',
            1,
            38,
            32,
            'I AM FIBONACCI',
            2,
            'print',
            1,
            35,
            33,
            2,
            36,
            0,
            15,
            40,
            5,
            36,
            0,
            38,
            39,
            18,
            33,
            2,
            36,
            0,
            7,
            2,
            'fibonacci',
            1,
            33,
            1,
            36,
            0,
            7,
            2,
            'fibonacci',
            1,
            6,
            38,
            31,
            38,
            33,
            30,
            2,
            'fibonacci',
            1,
            32,
            'fib ',
            2,
            'concat',
            2,
            2,
            'print',
            1,
            35,
        ],
    },

    input_printer: {
        hog: "// I print all of the inputs\n\nprint(inputs.input_1)\nprint({'nested': inputs.secret_input_2})\nprint(inputs.secret_input_2)\nprint(f'substring: {inputs.secret_input_3}')\nprint(inputs)",
        bytecode: [
            '_h',
            32,
            'input_1',
            32,
            'inputs',
            1,
            2,
            2,
            'print',
            1,
            35,
            32,
            'nested',
            32,
            'secret_input_2',
            32,
            'inputs',
            1,
            2,
            42,
            1,
            2,
            'print',
            1,
            35,
            32,
            'secret_input_2',
            32,
            'inputs',
            1,
            2,
            2,
            'print',
            1,
            35,
            32,
            'secret_input_3',
            32,
            'inputs',
            1,
            2,
            32,
            'substring: ',
            2,
            'concat',
            2,
            2,
            'print',
            1,
            35,
            32,
            'inputs',
            1,
            1,
            2,
            'print',
            1,
            35,
        ],
    },
}

export const HOG_INPUTS_EXAMPLES: Record<string, Pick<HogFunctionType, 'inputs' | 'inputs_schema'>> = {
    simple_fetch: {
        inputs_schema: [
            { key: 'url', type: 'string', label: 'Webhook URL', secret: false, required: true },
            { key: 'body', type: 'json', label: 'JSON body', secret: false, required: true },
            {
                key: 'method',
                type: 'choice',
                label: 'HTTP Method',
                secret: false,
                choices: [
                    { label: 'POST', value: 'POST' },
                    { label: 'PUT', value: 'PUT' },
                    { label: 'PATCH', value: 'PATCH' },
                    { label: 'GET', value: 'GET' },
                ],
                required: true,
            },
            { key: 'headers', type: 'dictionary', label: 'Headers', secret: false, required: false },
        ],
        inputs: {
            url: {
                value: 'https://example.com/posthog-webhook',
                bytecode: ['_h', 32, 'https://example.com/posthog-webhook'],
            },
            method: { value: 'POST' },
            headers: {
                value: { version: 'v={event.properties.$lib_version}' },
                bytecode: {
                    version: ['_h', 32, '$lib_version', 32, 'properties', 32, 'event', 1, 3, 32, 'v=', 2, 'concat', 2],
                },
            },
            body: {
                value: {
                    event: '{event}',
                    groups: '{groups}',
                    nested: { foo: '{event.url}' },
                    person: '{person}',
                    event_url: "{f'{event.url}-test'}",
                },
                bytecode: {
                    event: ['_h', 32, 'event', 1, 1],
                    groups: ['_h', 32, 'groups', 1, 1],
                    nested: { foo: ['_h', 32, 'url', 32, 'event', 1, 2] },
                    person: ['_h', 32, 'person', 1, 1],
                    event_url: ['_h', 32, '-test', 32, 'url', 32, 'event', 1, 2, 2, 'concat', 2],
                },
            },
        },
    },
    secret_inputs: {
        inputs_schema: [
            {
                key: 'input_1',
                type: 'string',
                label: 'input_1',
                secret: false,
                required: false,
            },
            {
                key: 'secret_input_2',
                type: 'dictionary',
                label: 'secret_input_2',
                secret: true,
                default: {},
                required: true,
            },
            {
                key: 'secret_input_3',
                type: 'string',
                label: 'secret_input_3',
                secret: true,
                required: true,
            },
        ],
        inputs: {
            input_1: { value: 'test', bytecode: ['_h', 32, 'test'] },
            secret_input_2: { value: { foo: 'bar' }, bytecode: { foo: ['_h', 32, 'bar'] } },
            secret_input_3: { value: 'super secret', bytecode: ['_h', 32, 'super secret'] },
        },
    },
}

export const HOG_FILTERS_EXAMPLES: Record<string, Pick<HogFunctionType, 'filters'>> = {
    no_filters: { filters: { events: [], actions: [], bytecode: ['_h', 29] } },
    pageview_or_autocapture_filter: {
        filters: {
            events: [
                {
                    id: '$pageview',
                    name: '$pageview',
                    type: 'events',
                    order: 0,
                    properties: [{ key: '$current_url', type: 'event', value: 'posthog', operator: 'icontains' }],
                },
                { id: '$autocapture', name: '$autocapture', type: 'events', order: 1 },
            ],
            actions: [],
            bytecode: [
                '_h',
                32,
                '$autocapture',
                32,
                'event',
                1,
                1,
                11,
                3,
                1,
                32,
                '%posthog%',
                32,
                '$current_url',
                32,
                'properties',
                1,
                2,
                18,
                32,
                '$pageview',
                32,
                'event',
                1,
                1,
                11,
                3,
                2,
                4,
                2,
            ],
        },
    },
}
