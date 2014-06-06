DHT Analyzer
============

This node.js script helps analyzing the Geography of peers of
Bittorrent's Mainline DHT network. The data comes from Prof.
Hartensteins Institute at the Steinbuch Centre for Computing (SCC) at
the Karlsruher Institut für Technologie (KIT).

## Sources
[BitCoinStatus](http://bitcoinstatus.rowit.co.uk/)

[Bitcoin Paper Barcelona](http://fc14.ifca.ai/bitcoin/papers/bitcoin14_submission_3.pdf)

## How to run

```sh
    $ git clone https://github.com/timsuchanek/dht-analyzer.git
    $ cd dht-analyzer
    $ npm install
    $ node index.js
```

## Result
The found pearson correlations are:

    Barcelona 1st day correlation:  0.7572424296726681
    Barcelona 37 day correlation:  0.7382909069513078
    Bitcoin Status correlation:  0.675059274785707

    Absolute Barcelona 1st day correlation:  0.7241837802263172
    Absolute Barcelona 37 day correlation:  0.5487823711117426
    Absolute Bitcoin Status correlation:  0.8580847392666425

    1st day and bitcoin status correlation 0.8390487977813774
    37 days and bitcoin status correlation 0.6578426189922111